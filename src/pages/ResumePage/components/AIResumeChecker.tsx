import type { FC } from "react";
import { memo, useState, useCallback } from "react";
import { 
  Button, 
  Text, 
  Select, 
  mts_brand_red 
} from "@chernyshovaalexandra/mtsui";
import styled from "styled-components";

interface AIResumeCheckerProps {
  attemptsRemaining: number;
}

const CheckerContainer = styled.section`
  background: var(--background-light-lower);
  border-radius: 12px;
  padding: 30px;
`;

const TopSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 40px;
  margin-top: 0;

  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 32px;
  }
  
  @media (max-width: 768px) {
    gap: 24px;
  }
`;

const FormSection = styled.div`
  flex: 1;
  max-width: 540px;
  min-width: 400px;
  
  @media (max-width: 1200px) {
    max-width: none;
    min-width: auto;
  }
`;

const ResultSection = styled.div`
  width: 664px;
  height: 456px;
  border-radius: 16px;
  border: 1px solid #D7DBE4;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--text-light-secondary);
  opacity: 1;
  margin-top: 0;
  
  @media (max-width: 1200px) {
    width: 100%;
    height: 300px;
  }
  
  @media (max-width: 768px) {
    height: 250px;
  }
`;

const FormDescription = styled(Text)`
  margin-bottom: 24px;
  color: var(--text-primary);
  font-weight: 400;
  font-size: 17px;
  line-height: 140%;
`;

const AttemptsInfo = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: white;
  border-radius: 16px;
  padding: 12px 20px;
  margin-bottom: 24px;
`;

const AttemptsText = styled(Text)`
  color: #212529;
  font-weight: 500;
`;

const AttemptsCount = styled.span`
  font-weight: 700;
  color: #212529;
`;

const FormField = styled.div`
  margin-bottom: 24px;
`;

const FieldLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #212529;
`;

const DropZone = styled.div<{ $isDragOver: boolean; $hasFile: boolean }>`
  border: 1px solid #D7DBE4;
  border-radius: 16px;
  height: 98px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ $isDragOver, $hasFile }) => 
    $hasFile ? '#F0F9F4' : $isDragOver ? '#FFF0F0' : 'white'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  &:hover {
    border-color: ${mts_brand_red};
    background: #FFF8F8;
  }

  &:focus-within {
    outline: 2px solid ${mts_brand_red};
    outline-offset: -2px;
  }
`;

const DropZoneIcon = styled.div<{ $hasFile?: boolean }>`
  font-size: 20px;
  margin-right: 8px;
  color: ${({ $hasFile }) => 
    $hasFile ? '#26CD58' : '#666'};
`;

const DropZoneText = styled(Text)`
  color: #212529;
  margin-bottom: 4px;
`;

const DropZoneSubtext = styled(Text)`
  font-size: 12px;
  color: var(--text-light-secondary);
`;

const HiddenFileInput = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  color: #26CD58;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  max-width: 300px;
  background-color: ${mts_brand_red} !important;
  border: 1px solid ${mts_brand_red} !important;
  text-transform: uppercase;
  font-weight: 600;
  padding: 16px;
  border-radius: 8px;
  
  &:disabled {
    background-color: #D0D5DD !important;
    border-color: #D0D5DD !important;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    max-width: none;
  }
`;

const directionOptions = [
  { label: "Выбери направление", value: "", disabled: true },
  { label: "IT и разработка", value: "it" },
  { label: "Маркетинг и реклама", value: "marketing" },
  { label: "Продажи и развитие", value: "sales" },
  { label: "Финансы и аналитика", value: "finance" },
  { label: "Дизайн и творчество", value: "design" }
];

export const AIResumeChecker: FC<AIResumeCheckerProps> = memo(({ 
  attemptsRemaining 
}) => {
  const [direction, setDirection] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDirectionChange = useCallback((value: string) => {
    setDirection(value);
  }, []);

  const handleFileSelect = useCallback((file: File) => {
    if (file && file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
      setSelectedFile(file);
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
    console.log('Отправка резюме на проверку:', { direction, file: selectedFile?.name });
  }, [direction, selectedFile]);

  const isFormValid = direction && selectedFile && attemptsRemaining > 0;

  return (
    <CheckerContainer>
      <TopSection>
        <FormSection>
          <FormDescription variant="P4-Regular-Text">
            Выбирай направление, в котором хочешь работать, загружай 
            своё резюме и получай от ИИ советы по его улучшению — 
            доступно три попытки для экспериментов.
          </FormDescription>

          <AttemptsInfo>
            <AttemptsText variant="P4-Regular-Text">
              Попытки:
            </AttemptsText>
            <AttemptsCount>{attemptsRemaining}</AttemptsCount>
          </AttemptsInfo>

          <form onSubmit={handleSubmit}>
            <FormField>
              <FieldLabel htmlFor="direction-select">
                Направление
              </FieldLabel>
              <Select
                id="direction-select"
                name="direction"
                placeholder="Выбери направление"
                options={directionOptions}
                value={direction}
                onChange={handleDirectionChange}
                aria-label="Выберите направление для проверки резюме"
              />
            </FormField>

            <FormField>
              <FieldLabel>
                Документ в формате .doc
              </FieldLabel>
              <DropZone
                $isDragOver={isDragOver}
                $hasFile={!!selectedFile}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => document.getElementById('file-input')?.click()}
                role="button"
                tabIndex={0}
                aria-label="Перетащи или загрузи файл резюме"
              >
                                                  {selectedFile ? (
                   <FileInfo>
                     <DropZoneIcon $hasFile={!!selectedFile}>
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
                       Максимальный вес файла XXX МБ
                     </DropZoneSubtext>
                   </>
                 )}
                <HiddenFileInput
                  id="file-input"
                  type="file"
                  accept=".doc,.docx"
                  onChange={handleFileInputChange}
                />
              </DropZone>
            </FormField>

            <ButtonWrapper>
              <SubmitButton
                variant="primary"
                type="submit"
                disabled={!isFormValid}
                aria-label="Отправить резюме на проверку через ИИ"
              >
                Отправить на проверку
              </SubmitButton>
            </ButtonWrapper>
          </form>
        </FormSection>

        <ResultSection>
          <Text variant="P4-Regular-Text">
            Здесь будет результат<br />
            проверки резюме
          </Text>
        </ResultSection>
      </TopSection>
    </CheckerContainer>
  );
}); 