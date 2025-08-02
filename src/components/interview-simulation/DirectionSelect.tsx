import React, { useState } from 'react';
import styled from 'styled-components';
import { mts_brand_red } from '@chernyshovaalexandra/mtsui';

interface DirectionOption {
  value: string;
  label: string;
}

interface DirectionSelectProps {
  value: string;
  onChange: (value: string) => void;
  options?: DirectionOption[];
  placeholder?: string;
}

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SelectButton = styled.button<{ isOpen: boolean }>`
  width: 100%;
  height: 52px;
  padding: 0 16px;
  border: 1px solid #BCC3D080;
  border-radius: 16px;
  background: white;
  text-align: left;
  font-family: 'MTS Text', sans-serif;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${mts_brand_red};
  }
  
  &:focus-visible {
    outline: 2px solid ${mts_brand_red};
    outline-offset: 2px;
  }
  
  svg {
    width: 16px;
    height: 16px;
    color: #6B7280;
    transition: transform 0.2s ease;
    transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
`;

const OptionsContainer = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 10;
  background: white;
  border: 1px solid #BCC3D080;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  display: ${props => props.isOpen ? 'block' : 'none'};
  margin-top: 4px;
`;

const Option = styled.button`
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: white;
  text-align: left;
  font-family: 'MTS Text', sans-serif;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #f9fafb;
  }
  
  &:focus-visible {
    outline: 2px solid ${mts_brand_red};
    outline-offset: -2px;
    background: #fef2f2;
  }
  
  &:first-child {
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
  }
  
  &:last-child {
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }
`;

const itDirections: DirectionOption[] = [
  { value: 'frontend', label: 'Frontend разработка' },
  { value: 'backend', label: 'Backend разработка' },
  { value: 'fullstack', label: 'Fullstack разработка' },
  { value: 'mobile', label: 'Мобильная разработка' },
  { value: 'devops', label: 'DevOps' },
  { value: 'qa', label: 'Тестирование (QA)' },
  { value: 'data', label: 'Data Science' },
  { value: 'ml', label: 'Machine Learning' },
  { value: 'security', label: 'Информационная безопасность' },
  { value: 'analyst', label: 'Системный аналитик' },
];

export const DirectionSelect: React.FC<DirectionSelectProps> = ({
  value,
  onChange,
  options = itDirections,
  placeholder = 'Работа в IT'
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(opt => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Закрываем при клике вне компонента
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-direction-select]')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <SelectContainer data-direction-select onKeyDown={handleKeyDown}>
      <SelectButton
        type="button"
        isOpen={isOpen}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Выбрать направление работы"
      >
        <span>{displayText}</span>
        <svg viewBox="0 0 16 16" fill="currentColor">
          <path fillRule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.207 8.5a.5.5 0 0 1-.414 0L4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </SelectButton>
      
      <OptionsContainer isOpen={isOpen} role="listbox">
        {options.map((option) => (
          <Option
            key={option.value}
            type="button"
            onClick={() => handleSelect(option.value)}
            role="option"
            aria-selected={value === option.value}
          >
            {option.label}
          </Option>
        ))}
      </OptionsContainer>
    </SelectContainer>
  );
}; 