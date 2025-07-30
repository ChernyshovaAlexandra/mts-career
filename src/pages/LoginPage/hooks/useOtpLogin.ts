import { useCallback, useEffect, useState } from "react";

const OTP_TTL_SEC = 600; // 10 минут

export function useOtpLogin() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [sent, setSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const startTimer = useCallback(() => setTimeLeft(OTP_TTL_SEC), []);

  const expired = sent && timeLeft <= 0;

  useEffect(() => {
    if (!sent || timeLeft <= 0) return;
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1_000);
    return () => clearInterval(id);
  }, [sent, timeLeft]);

  return {
    /* state */
    email,
    setEmail,
    code,
    setCode,
    sent,
    setSent,
    timeLeft,
    expired,
    password,
    setPassword,
    /* actions */
    startTimer,
  };
}
