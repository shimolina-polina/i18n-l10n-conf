import { type FC, useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { SUPPORTED_LANGS, SUPPORTED_LOCALES } from "@/constants";
import { DoneIcon, EarthIcon } from "@/icons";
import type { Lang } from "@/types";

import { useClickOutside } from "./hooks";
import styles from "./styles.module.css";

const LANG_LABEL: Record<Lang, string> = {
    ru: "Русский",
    en: "English",
    ar: "اَلْعَرَبِيَّةُ",
};

export const LangSelect: FC = () => {
    const [showMenu, setShowMenu] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const currentLocale = location.pathname.split("/")[1];
    const [currentLang, currentRegion] = currentLocale ? currentLocale.split("-") : ["en"];
    const selectedLang: Lang = SUPPORTED_LANGS.includes(currentLang as Lang) ? (currentLang as Lang) : "en";

    const handleMenuClose = useCallback(() => {
        setShowMenu(false);
    }, []);

    const handleMenuToggle = useCallback(() => {
        setShowMenu((prevShowMenu) => !prevShowMenu);
    }, []);

    const langSelectRef = useClickOutside<HTMLDivElement>(handleMenuClose);

    const handleLangChange = (lang: Lang) => {
        let newLocale: string = lang;
        if (currentRegion) {
            const candidate = `${lang}-${currentRegion}` as const;
            if ((SUPPORTED_LOCALES as readonly string[]).includes(candidate)) {
                newLocale = candidate;
            }
        } else if (lang === "ru") {
            newLocale = "ru-RU";
        }
        if (!(SUPPORTED_LOCALES as readonly string[]).includes(newLocale)) {
            newLocale = lang;
        }
        const pathParts = location.pathname.split("/");
        pathParts[1] = newLocale;
        const newPath = pathParts.join("/") || "/";
        navigate(newPath + location.search, { replace: true });
        setShowMenu(false);
    };

    return (
        <div className={styles.langSelect} ref={langSelectRef}>
            <button
                className={styles.langSelectButton}
                onClick={handleMenuToggle}
                data-testid="lang-select-button"
            >
                <span className={styles.langSelectText}>
                    {LANG_LABEL[selectedLang as Lang]}
                </span>

                <EarthIcon />
            </button>

            {showMenu && (
                <ul
                    className={styles.langSelectMenu}
                    data-testid="lang-select-menu"
                >
                    {SUPPORTED_LANGS.map((lang) => {
                        const langName = LANG_LABEL[lang];
                        return (
                            <li
                                className={styles.langSelectMenuItem}
                                key={lang}
                                onClick={() => handleLangChange(lang)}
                            >
                                <span
                                    className={styles.langSelectMenuItemText}
                                >
                                    {langName}
                                </span>

                                {lang === selectedLang && <DoneIcon />}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};
