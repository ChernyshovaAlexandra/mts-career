import type { FC } from "react";
import { memo, useState, useEffect } from "react";
import { IconArrowCircle } from "@chernyshovaalexandra/mtsui";
import { EmployeeCard } from "../../../../entities/EmployeeCard";
import {
  CarouselContainer,
  CarouselWrapper,
  CarouselTrack,
  CarouselCard,
  NavigationButton,
  DotsContainer,
  Dot,
  CarouselStatus
} from "./styles";

interface Employee {
  id: string;
  name: string;
  position: string;
  description: string;
  imageUrl: string;
}

interface EmployeeCarouselProps {
  selectedEmployee?: string;
  onEmployeeSelect?: (employeeId: string) => void;
}

const employees: Employee[] = [
  {
    id: "1",
    name: "ИМЯ СОТРУДНИКА",
    position: "Должность",
    description: "Расскажу о бонусах и корпоративной культуре",
    imageUrl: "/images/employees/employee1.jpg"
  },
  {
    id: "2",
    name: "ИМЯ СОТРУДНИКА",
    position: "Должность",
    description: "Расскажу о бонусах и корпоративной культуре",
    imageUrl: "/images/employees/employee2.jpg"
  },
  {
    id: "3",
    name: "ИМЯ СОТРУДНИКА",
    position: "Должность",
    description: "Расскажу о бонусах и корпоративной культуре",
    imageUrl: "/images/employees/employee3.jpg"
  },
  {
    id: "4",
    name: "ИМЯ СОТРУДНИКА",
    position: "Должность",
    description: "Расскажу о бонусах и корпоративной культуре",
    imageUrl: "/images/employees/employee4.jpg"
  }
];

export const EmployeeCarousel: FC<EmployeeCarouselProps> = memo(({ 
  selectedEmployee: externalSelectedEmployee, 
  onEmployeeSelect 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [internalSelectedEmployee, setInternalSelectedEmployee] = useState<string>("1");
  
  const selectedEmployee = externalSelectedEmployee || internalSelectedEmployee;
  
  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    }
    return 3;
  };
  
  useEffect(() => {
    const handleResize = () => {
      const newItemsPerView = getItemsPerView();
      setItemsPerView(newItemsPerView);
      setCurrentIndex(0);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const maxIndex = Math.max(0, employees.length - itemsPerView);
  
  const handlePrevClick = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };
  
  const handleNextClick = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };
  
  const handleDotClick = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  const handleEmployeeSelect = (employeeId: string) => {
    if (onEmployeeSelect) {
      onEmployeeSelect(employeeId);
    } else {
      setInternalSelectedEmployee(employeeId);
    }
  };

  const getCurrentEmployees = () => {
    const startIndex = currentIndex;
    const endIndex = Math.min(startIndex + itemsPerView, employees.length);
    return employees.slice(startIndex, endIndex);
  };

  const currentEmployees = getCurrentEmployees();
  const totalSlides = maxIndex + 1;

  return (
    <CarouselContainer 
      role="region" 
      aria-label="Карусель сотрудников для рандом-кофе"
      aria-describedby="employee-carousel-instructions"
    >
      <CarouselStatus
        id="employee-carousel-instructions"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        Показаны сотрудники {currentIndex + 1}-{currentIndex + currentEmployees.length} из {employees.length}. 
        Используйте кнопки навигации или клавиши влево/вправо для перемещения.
      </CarouselStatus>

      <CarouselWrapper>
        <CarouselTrack 
          $currentIndex={currentIndex} 
          $itemsPerView={itemsPerView}
          role="group"
          aria-label={`Группа сотрудников ${currentIndex + 1} из ${totalSlides}`}
        >
          {currentEmployees.map((employee) => (
            <CarouselCard 
              key={employee.id}
              role="article"
              aria-labelledby={`employee-${employee.id}-name`}
              aria-describedby={`employee-${employee.id}-description`}
            >
              <EmployeeCard
                name={employee.name}
                position={employee.position}
                selected={selectedEmployee === employee.id}
                onClick={() => handleEmployeeSelect(employee.id)}
              />
            </CarouselCard>
          ))}
        </CarouselTrack>
        
        <NavigationButton
          $direction="prev"
          onClick={handlePrevClick}
          disabled={currentIndex === 0}
          aria-label={`Предыдущие сотрудники. ${currentIndex === 0 ? 'Недоступно - вы находитесь в начале' : `Показать сотрудников ${Math.max(1, currentIndex)}-${currentIndex + itemsPerView - 1}`}`}
          title="Предыдущая группа сотрудников"
        >
          <IconArrowCircle
            outlined={false}
            direction="left"
            color="#1D2023"
            aria-hidden="true"
          />
        </NavigationButton>
        
        <NavigationButton
          $direction="next" 
          onClick={handleNextClick}
          disabled={currentIndex >= maxIndex}
          aria-label={`Следующие сотрудники. ${currentIndex >= maxIndex ? 'Недоступно - вы находитесь в конце' : `Показать сотрудников ${currentIndex + itemsPerView + 1}-${Math.min(employees.length, currentIndex + itemsPerView * 2)}`}`}
          title="Следующая группа сотрудников"
        >
          <IconArrowCircle
            outlined={false}
            direction="right"
            color="#1D2023"
            aria-hidden="true"
          />
        </NavigationButton>
      </CarouselWrapper>
      
      {totalSlides > 1 && (
        <DotsContainer 
          role="tablist" 
          aria-label="Навигация по группам сотрудников"
        >
          {Array.from({ length: totalSlides }, (_, index) => (
            <Dot
              key={index}
              $isActive={index === currentIndex}
              onClick={() => handleDotClick(index)}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Перейти к группе сотрудников ${index + 1} из ${totalSlides}`}
              aria-controls={`employee-carousel-panel-${index}`}
              tabIndex={index === currentIndex ? 0 : -1}
              title={`Группа сотрудников ${index + 1}`}
            />
          ))}
        </DotsContainer>
      )}
    </CarouselContainer>
  );
}); 