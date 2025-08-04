import React, { useRef } from 'react';
import styled from 'styled-components';
import { mts_brand_red } from '@chernyshovaalexandra/mtsui';

interface FileUploadProps {
  fileName: string;
  onFileChange: (file: File | null) => void;
  acceptedFormats?: string;
  label?: string;
  fileSize?: string;
}

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const UploadLabel = styled.label`
  font-family: 'MTS Text', sans-serif;
  font-size: 14px;
  color: #374151;
  white-space: nowrap;
  cursor: pointer;
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 52px;
  padding: 0 32px;
  border: 1px solid #BCC3D080;
  border-radius: 16px;
  background: white;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    border-color: ${mts_brand_red};
  }
  
  &:focus-visible {
    border-color: ${mts_brand_red};
    outline: 2px solid ${mts_brand_red};
    outline-offset: 2px;
  }
`;

const FileNameContainer = styled.div`
  flex: 1;
  min-width: 0;
`;

const FileName = styled.div`
  font-family: 'MTS Text', sans-serif;
  font-size: 14px;
  color: #374151;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FileSize = styled.div`
  font-family: 'MTS Text', sans-serif;
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 2px;
`;

// UploadButton component removed - no longer needed

const HiddenInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const FileIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  svg {
    width: 16px;
    height: 16px;
    color: #6B7280;
  }
`;

export const FileUpload: React.FC<FileUploadProps> = ({
  fileName,
  onFileChange,
  acceptedFormats = '.doc,.docx,.pdf',
  label = 'Резюме в формате .doc',
  fileSize = 'xx мб'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onFileChange(file);
  };

  const getFileIcon = () => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return (
          <svg viewBox="0 0 16 16" fill="currentColor">
            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
            <path d="M4.603 14.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.697 19.697 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.712 5.712 0 0 1-.911-.95 11.651 11.651 0 0 0-1.997.406 11.307 11.307 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.266.266 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.71 12.71 0 0 1 1.01-.193 11.744 11.744 0 0 1-.51-.858 20.801 20.801 0 0 1-.5 1.05zm2.446.45c.15.163.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.876 3.876 0 0 0-.612-.053zM8.078 7.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.823.024.111.054.227.089.346z"/>
          </svg>
        );
      case 'doc':
      case 'docx':
        return (
          <svg viewBox="0 0 16 16" fill="currentColor">
            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
            <path d="M4.603 12.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.697 19.697 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.86-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.18-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.712 5.712 0 0 1-.911-.95 11.651 11.651 0 0 0-1.997.406 11.307 11.307 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.793.793 0 0 1-.58.029z"/>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 16 16" fill="currentColor">
            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4 2a1 1 0 0 1 1-1h3.5v2A2 2 0 0 0 10.5 5h2v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2z"/>
          </svg>
        );
    }
  };

  return (
    <UploadContainer>
      {label && <UploadLabel>{label}</UploadLabel>}
      <FileInfo
        onClick={handleContainerClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleContainerClick();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Выбрать файл резюме"
      >
        <FileIcon>
          {getFileIcon()}
        </FileIcon>
        <FileNameContainer>
          <FileName>{fileName}</FileName>
          <FileSize>{fileSize}</FileSize>
        </FileNameContainer>
      </FileInfo>
      
      <HiddenInput
        ref={fileInputRef}
        type="file"
        accept={acceptedFormats}
        onChange={handleFileChange}
        aria-label="Загрузить файл резюме"
      />
    </UploadContainer>
  );
}; 