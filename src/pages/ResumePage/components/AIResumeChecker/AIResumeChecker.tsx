import type { FC } from "react";
import { memo, useState, useCallback } from "react";
import { 
  Text, 
  Select 
} from "@chernyshovaalexandra/mtsui";
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
  SubmitButton
} from "./styles";

interface AIResumeCheckerProps {
  attemptsRemaining: number;
}

export const AIResumeChecker: FC<AIResumeCheckerProps> = memo(({ 
  attemptsRemaining 
}) => {
  const [direction, setDirection] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [, setStatusMessage] = useState("");

  const handleDirectionChange = useCallback((value: string) => {
    setDirection(value);
    setStatusMessage(`Выбрано направление: ${directionOptions.find(opt => opt.value === value)?.label}`);
  }, []);

  const handleFileSelect = useCallback((file: File) => {
    if (file && (file.name.endsWith('.doc') || file.name.endsWith('.docx'))) {
      setSelectedFile(file);
      setStatusMessage(`Файл загружен: ${file.name}`);
    } else {
      setStatusMessage("Ошибка: файл должен быть в формате .doc или .docx");
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

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage("Отправляем резюме на проверку...");
    console.log('Отправка резюме на проверку:', { direction, file: selectedFile?.name });
  }, [direction, selectedFile]);

  const handleDropZoneKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      document.getElementById('file-input')?.click();
    }
  }, []);

  const isFormValid = direction && selectedFile && attemptsRemaining > 0;

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
                onClick={() => document.getElementById('file-input')?.click()}
                onKeyDown={handleDropZoneKeyDown}
                role="button"
                tabIndex={0}
                aria-labelledby="file-upload-label"
                aria-describedby="file-upload-help"
                aria-pressed={!!selectedFile}
                title="Нажмите для выбора файла или перетащите файл резюме сюда"
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
                />
              </DropZone>
            </FormField>

            <ButtonWrapper>
              <SubmitButton
                variant="primary"
                type="submit"
                disabled={!isFormValid}
                aria-describedby="submit-help"
                title={isFormValid ? "Отправить резюме на проверку" : "Заполните все поля для активации"}
              >
                Отправить на проверку
              </SubmitButton>
            </ButtonWrapper>
          </form>
        </FormSection>

        <ResultSection 
          role="complementary"
          aria-label="Область для отображения результатов проверки резюме"
          aria-describedby="result-placeholder"
        >
          <Text id="result-placeholder" variant="P4-Regular-Text">
            Здесь будет результат<br />
            проверки резюме
          </Text>
        </ResultSection>
      </TopSection>
    </CheckerContainer>
  );
}); 