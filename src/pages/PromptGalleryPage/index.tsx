import { useState, type FC } from 'react';
import { Pagination } from 'antd';
import { CardGrid, Section } from '../../shared';
import { MainLayout } from '../../layouts';
import PromptCard from '../../entities/PromptCard';

interface PromptItem {
  id: number;
  title: string;
  image: string;
  description: string;
}

const prompts: PromptItem[] = new Array(12).fill(null).map((_, i) => ({
  id: i,
  title: `Промт ${i + 1}`,
  image: '/images/default-placeholder.svg',
  description: 'Описание промта...'
}));

const PAGE_SIZE = 6;

const PromptGalleryPage: FC = () => {
  const [page, setPage] = useState(1);

  const start = (page - 1) * PAGE_SIZE;
  const pageItems = prompts.slice(start, start + PAGE_SIZE);

  return (
    <MainLayout>
      <Section title="Промт-галерея">
        <CardGrid columns={3}>
          {pageItems.map((item) => (
            <PromptCard
              key={item.id}
              title={item.title}
              imageSrc={item.image}
              description={item.description}
            />
          ))}
        </CardGrid>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
          <Pagination
            current={page}
            pageSize={PAGE_SIZE}
            total={prompts.length}
            onChange={setPage}
          />
        </div>
      </Section>
    </MainLayout>
  );
};

export default PromptGalleryPage;
