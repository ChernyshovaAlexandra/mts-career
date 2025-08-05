import styled from 'styled-components';
import { Header, Text } from '@chernyshovaalexandra/mtsui';
import { mts_brand_red } from '@chernyshovaalexandra/mtsui';

export const PageContainer = styled.div`
  padding: 40px 0;
  
  @media (max-width: 768px) {
    padding: 20px 0;
  }
`;

export const ContentWrapper = styled.div`
  margin-bottom: 48px;
  text-align: center;
  
  @media (max-width: 768px) {
    margin-bottom: 32px;
  }
`;

export const MainTitle = styled(Header).attrs({ as: 'h1' })`
  font-size: 48px;
  color: #1D2023;
  font-family: 'MTS Wide', sans-serif;
  font-weight: 500;
  line-height: 110%;
  margin: 0 0 16px 0;
  
  @media (max-width: 768px) {
    font-size: 32px;
    margin: 0 0 12px 0;
  }
  
  @media (max-width: 480px) {
    font-size: 28px;
    margin: 0 0 10px 0;
  }
`;

export const Description = styled(Text)`
  font-family: 'MTS Text', sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 140%;
  color: #6B7280;
  margin: 0;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 150%;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    line-height: 160%;
  }
`;

export const VacancySection = styled.section`
  margin-bottom: 64px;
  
  @media (max-width: 768px) {
    margin-bottom: 48px;
  }
`;

export const SectionTitle = styled(Header).attrs({ as: 'h2' })`
  font-size: 32px;
  color: #1D2023;
  font-family: 'MTS Wide', sans-serif;
  font-weight: 500;
  line-height: 110%;
  margin: 0 0 32px 0;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 24px;
    margin: 0 0 24px 0;
  }
  
  @media (max-width: 480px) {
    font-size: 20px;
    margin: 0 0 20px 0;
  }
`;

export const VacancyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
    margin-bottom: 32px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-bottom: 24px;
  }
`;

export const VacancyCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${mts_brand_red};
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.1);
  }
  
  @media (max-width: 768px) {
    padding: 20px;
  }
  
  @media (max-width: 480px) {
    padding: 16px;
  }
`;

export const VacancyTitle = styled.h3`
  font-family: 'MTS Text', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #1D2023;
  margin: 0 0 8px 0;
  line-height: 140%;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const VacancyDepartment = styled.div`
  font-family: 'MTS Text', sans-serif;
  font-size: 14px;
  color: ${mts_brand_red};
  font-weight: 500;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const VacancyLocation = styled.div`
  font-family: 'MTS Text', sans-serif;
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 4px;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const VacancyType = styled.div`
  font-family: 'MTS Text', sans-serif;
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    font-size: 13px;
    margin-bottom: 12px;
  }
`;

export const VacancyLink = styled.a`
  display: inline-block;
  background: ${mts_brand_red};
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-family: 'MTS Text', sans-serif;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background: #dc2626;
    transform: translateY(-1px);
  }
  
  &:focus-visible {
    outline: 2px solid ${mts_brand_red};
    outline-offset: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 13px;
    padding: 6px 12px;
  }
`; 