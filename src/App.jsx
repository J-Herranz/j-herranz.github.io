import { useState, createContext } from 'react';
import { useCurrentApp } from './hooks/useCurrentApp.js';
import { useTranslations } from './hooks/useTranslations.js';
import { useDarkMode } from './hooks/useDarkMode.js';
import { useRenderSubApp } from './hooks/useRenderSubApp.jsx';

import { Header } from './components/Header'

import './styles/App.css'

export const LanguageContext = createContext();

function App() {
    const [language, setLanguage] = useState('fr');
    const { currentApp, setCurrentApp } = useCurrentApp();
    const translations = useTranslations(language);
    const darkmodeBool = useDarkMode();
    const renderApp = useRenderSubApp({ currentApp, setCurrentApp, darkmodeBool, languageCode: language, t: translations });

    //const darkmodeBool = useRef(true);

    if (!translations) {
        return <p>Loading translations...</p>;
    }

    const sortedSubAppInfo = (translations && translations.subAppInfo) ? translations.subAppInfo.sort((a, b) => {
        if (a.appCode === 'home') return -1;
        if (b.appCode === 'home') return 1;

        return a.appName.localeCompare(b.appName);
    }) : [];

    const appDivClassNameSelector = () => {
        switch (currentApp) {
            case 'calculator':
                return 'App background-calculator'
            case 'countryInfo':
                return 'App backgroundImage-countryInfo'
            default:
                return 'App'
        }
    }

    const subAppDivClassNameSelector = () => {
        if (currentApp === 'calculator') return 'subApp-div subApp-div-flexStart'

        return 'subApp-div'
    }


    return (
        <>
            <div className={appDivClassNameSelector()}>
                <Header setApp={setCurrentApp} setLanguage={setLanguage} languageCode={language} t={sortedSubAppInfo} />
                <div className={subAppDivClassNameSelector(currentApp)}>
                    {renderApp()}
                </div>
                <footer className="footer">
                    <small>{`© Joel Herranz ${new Date().getFullYear()}. ${translations.footer}`}</small>
                </footer>
            </div>
        </>
    );
}

export default App
