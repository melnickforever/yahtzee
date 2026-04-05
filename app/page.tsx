'use client';

import { useState } from 'react';
import { Language } from '@/app/i18n';
import { LanguageSwitcher } from '@/app/components/LanguageSwitcher';
import { RulesReference } from '@/app/components/RulesReference';
import { ScoreTable } from '@/app/components/ScoreTable';

export default function Home() {
  const [language, setLanguage] = useState<Language>('uk');

  return (
    <div style={{ position: 'relative' }}>
      <LanguageSwitcher currentLanguage={language} onLanguageChange={setLanguage} />
      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '16px' }}>
        <RulesReference language={language} />
        <ScoreTable language={language} />
      </main>
    </div>
  );
}
