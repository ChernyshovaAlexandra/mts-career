import type { FC } from "react";
import { memo, useState, useCallback } from "react";
import { 
  Text, 
  Select 
} from "@chernyshovaalexandra/mtsui";
import { apiService } from "../../../../services/apiService";
import { useUserStore } from "../../../../store";
import { directionOptions } from "../../constants";
import {
  CheckerContainer,
  TopSection,
  FormSection,
  ResultSection,
  FormDescription,
  AttemptsInfo,
  AttemptsText,
  AttemptsCount,
  FormField,
  FieldLabel,
  HiddenDescription,
  DropZone,
  DropZoneIcon,
  DropZoneText,
  DropZoneSubtext,
  HiddenFileInput,
  FileInfo,
  ButtonWrapper,
  SubmitButton,
  LoadingSpinner,
  ResultContent,
  ResultTitle,
  ResultSummary,
  ResultTags,
  TagItem,
  ErrorMessage,
} from "./styles";

interface AIResumeCheckerProps {
  attemptsRemaining: number;
}

interface AnalysisResult {
  analysis?: string;
  summary?: string;
  tags?: string[];
}

export const AIResumeChecker: FC<AIResumeCheckerProps> = memo(({ 
  attemptsRemaining 
}) => {
  const decrementAttempts = useUserStore((s) => s.decrementResumeAttempts);
  const [direction, setDirection] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [, setStatusMessage] = useState("");

  const handleDirectionChange = useCallback((value: string) => {
    setDirection(value);
    setStatusMessage(`Выбрано направление: ${directionOptions.find(opt => opt.value === value)?.label}`);
    setError(null);
  }, []);

  const handleFileSelect = useCallback((file: File) => {

    if (file && (file.name.endsWith('.doc') || file.name.endsWith('.docx'))) {
      setSelectedFile(file);
      setStatusMessage(`Файл загружен: ${file.name}`);
      setError(null);
    } else {
      setError("Ошибка: файл должен быть в формате .doc или .docx");
      setStatusMessage("Ошибка: файл должен быть в формате .doc или .docx");
      console.error('Неподдерживаемый формат файла:', file?.name);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
        
    const files = Array.from(e.dataTransfer.files);
    const docFile = files.find(file => 
      file.name.endsWith('.doc') || file.name.endsWith('.docx')
    );
    
    if (docFile) {
      handleFileSelect(docFile);
    } else {
      setError("Ошибка: поддерживаются только файлы .doc и .docx");
      setStatusMessage("Ошибка: поддерживаются только файлы .doc и .docx");
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile || !direction) {
      setError("Пожалуйста, выберите направление и загрузите файл резюме");
      console.error('Валидация не пройдена:', { selectedFile: !!selectedFile, direction: !!direction });
      return;
    }

    if (attemptsRemaining <= 0) {
      setError("У вас закончились попытки для проверки резюме");
      return;
    }

    // Decrease attempts immediately after user initiates a check
    decrementAttempts();

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    setStatusMessage("Отправляем резюме на проверку...");

    try {
      // Логирование для отладки
      console.log('Отправляем файл:', {
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        fileType: selectedFile.type,
        direction: direction
      });

      const response = await apiService.uploadResume(selectedFile);
      
      console.log('Ответ от сервера:', response.data);
      
      setAnalysisResult({
        analysis: response.data.analysis ?? response.data.summary ?? "",
        summary: response.data.summary,
        tags: response.data.tags
      });
      
      setStatusMessage("Анализ резюме завершен успешно!");
      
    } catch (err: any) {
      console.error('Ошибка при отправке резюме:', err);
      
      if (err.response?.status === 401) {
        setError("Ошибка авторизации. Пожалуйста, войдите в систему заново.");
      } else if (err.response?.status === 429) {
        setError("Превышен лимит попыток. Попробуйте позже.");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Произошла ошибка при отправке резюме. Попробуйте еще раз.");
      }
      
      setStatusMessage("Ошибка при отправке резюме");
    } finally {
      setIsLoading(false);
    }
  }, [direction, selectedFile, attemptsRemaining]);

  const handleDropZoneKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      document.getElementById('file-input')?.click();
    }
  }, []);

  const isFormValid = direction && selectedFile && attemptsRemaining > 0 && !isLoading;

  return (
    <CheckerContainer role="region" aria-labelledby="ai-checker-heading">
      <h3 id="ai-checker-heading" className="visually-hidden">
        Проверка резюме с помощью искусственного интеллекта
      </h3>
      
      <HiddenDescription id="direction-help">
        Выберите сферу деятельности, чтобы ИИ мог дать наиболее точные рекомендации по составлению резюме
      </HiddenDescription>
      
      <HiddenDescription id="file-upload-help">
        Нажмите на область или перетащите файл резюме в формате Word. Поддерживаются только файлы .doc и .docx
      </HiddenDescription>
      
      <HiddenDescription id="submit-help">
        {!isFormValid ? "Заполните все обязательные поля для активации кнопки отправки" : "Отправить резюме на проверку искусственным интеллектом"}
        {attemptsRemaining === 0 && " У вас закончились попытки проверки"}
      </HiddenDescription>
      
      <TopSection>
        <FormSection>
          <FormDescription 
            id="form-description" 
            variant="P4-Regular-Text"
          >
            Выбирай направление, в котором хочешь работать, загружай 
            своё резюме и получай от ИИ советы по его улучшению — 
            доступно три попытки для экспериментов.
          </FormDescription>

          <AttemptsInfo 
            role="status" 
            aria-label={`У вас осталось ${attemptsRemaining} попыток для проверки резюме`}
          >
            <AttemptsText variant="P4-Regular-Text">
              Попытки:
            </AttemptsText>
            <AttemptsCount>{attemptsRemaining}</AttemptsCount>
          </AttemptsInfo>

          {error && (
            <ErrorMessage 
              role="alert" 
              aria-live="assertive"
              variant="P4-Regular-Text"
            >
              {error}
            </ErrorMessage>
          )}

          <form 
            onSubmit={handleSubmit}
            aria-describedby="form-description"
            role="form"
            aria-label="Форма загрузки резюме для ИИ-проверки"
          >
            <FormField>
              <FieldLabel htmlFor="direction-select">
                Направление *
              </FieldLabel>
              <Select
                id="direction-select"
                name="direction"
                placeholder="Выбери направление"
                options={directionOptions}
                value={direction}
                onChange={handleDirectionChange}
                aria-label="Выберите направление для проверки резюме"
                aria-describedby="direction-help"
                aria-required="true"
                disabled={isLoading}
              />
            </FormField>

            <FormField>
              <FieldLabel id="file-upload-label">
                Документ в формате .doc или .docx *
              </FieldLabel>
              <DropZone
                $isDragOver={isDragOver}
                $hasFile={!!selectedFile}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => !isLoading && document.getElementById('file-input')?.click()}
                onKeyDown={handleDropZoneKeyDown}
                role="button"
                tabIndex={isLoading ? -1 : 0}
                aria-labelledby="file-upload-label"
                aria-describedby="file-upload-help"
                aria-pressed={!!selectedFile}
                aria-disabled={isLoading}
                title={isLoading ? "Загрузка в процессе..." : "Нажмите для выбора файла или перетащите файл резюме сюда"}
              >
                {selectedFile ? (
                  <FileInfo>
                    <DropZoneIcon $hasFile={!!selectedFile} aria-hidden="true">
                      ✓
                    </DropZoneIcon>
                    <DropZoneText variant="P4-Regular-Text">
                      {selectedFile.name}
                    </DropZoneText>
                  </FileInfo>
                ) : (
                  <>
                    <DropZoneText variant="P4-Regular-Text">
                      Перетащи или загрузи файл
                    </DropZoneText>
                    <DropZoneSubtext variant="P4-Regular-Text">
                      Поддерживаются форматы .doc и .docx
                    </DropZoneSubtext>
                  </>
                )}
                <HiddenFileInput
                  id="file-input"
                  type="file"
                  accept=".doc,.docx"
                  onChange={handleFileInputChange}
                  aria-label="Выберите файл резюме"
                  disabled={isLoading}
                />
              </DropZone>
            </FormField>

            {attemptsRemaining > 0 ? (
              <ButtonWrapper>
                <SubmitButton
                  variant="primary"
                  type="submit"
                  disabled={!isFormValid}
                  aria-describedby="submit-help"
                  title={isFormValid ? "Отправить резюме на проверку" : "Заполните все поля для активации"}
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner aria-hidden="true" />
                      Отправка...
                    </>
                  ) : (
                    "Отправить на проверку"
                  )}
                </SubmitButton>
              </ButtonWrapper>
            ) : (
              <Text role="status" aria-live="polite" variant="P4-Regular-Text">
                Попытки проверки резюме закончились.
              </Text>
            )}
          </form>
        </FormSection>

        <ResultSection 
          role="complementary"
          aria-label="Область для отображения результатов проверки резюме"
          aria-describedby={analysisResult ? "analysis-result" : "result-placeholder"}
        >
          {isLoading ? (
            <div role="status" aria-live="polite">
              <LoadingSpinner aria-hidden="true" />
              <Text variant="P4-Regular-Text">
                Анализируем ваше резюме...
              </Text>
            </div>
          ) : analysisResult ? (
            <ResultContent id="analysis-result">
              <ResultTitle variant={"P4-Bold-Upp-Wide"} >
                Результат
              </ResultTitle>
              
              <ResultSummary variant="P4-Regular-Text">
                {analysisResult.analysis || analysisResult.summary}
              </ResultSummary>
              
              {analysisResult.tags && analysisResult.tags.length > 0 && (
                <ResultTags>
                  <Text variant="P4-Regular-Text" as="h4">
                    Рекомендуемые улучшения:
                  </Text>
                  {analysisResult.tags.map((tag, index) => (
                    <TagItem key={index} variant="P4-Regular-Text">
                      • {tag}
                    </TagItem>
                  ))}
                </ResultTags>
              )}
            </ResultContent>
          ) : (
            <Text id="result-placeholder" variant="P4-Regular-Text">
              Здесь будет результат<br />
              проверки резюме
            </Text>
          )}
        </ResultSection>
      </TopSection>
    </CheckerContainer>
  );
}); 