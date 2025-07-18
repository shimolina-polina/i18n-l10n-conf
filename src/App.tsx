import { type FC, useEffect, useMemo } from "react";
import {
    Navigate,
    Route,
    Routes,
    useLocation,
    useNavigate,
} from "react-router-dom";

import { SUPPORTED_LANGS } from "./constants";
import { geoService } from "./lib/geo-service";
import {
    ArticleAr,
    ArticleCss,
    ArticleEn,
    ArticleI18nKz,
    ArticleL10nRu,
    ArticleRtlIcons,
    ArticleUiBy,
    Home,
} from "./pages";

const ScrollToTop: FC = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const LocaleGuard: FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const SUPPORTED_LOCALES = useMemo(
        () => ["ru", "ru-RU", "ru-BY", "ru-KZ", "en", "ar"],
        []
    );
    const DEFAULT_LOCALE = "en";
    const pathLocale = location.pathname.split("/")[1];
    const pathLang = pathLocale?.split("-")[0];
    
    
    useEffect(() => {
        const userRegion = geoService.getCurrentRegion(location.search);
        if (pathLang === "ru" && pathLocale === "ru") {
            const newLocale = `ru-${userRegion}`;
            navigate(
                location.pathname.replace(/^\/ru(\/|$)/, `/${newLocale}$1`),
                { replace: true }
            );
            return;
        }
    
        if (pathLang === "ru") {
            const urlRegion = pathLocale.split("-")[1] || "RU";
            if (urlRegion !== userRegion) {
                const newLocale = `ru-${userRegion}`;
                navigate(
                    location.pathname.replace(
                        /^\/ru(-[A-Z]{2})?(\/|$)/,
                        `/${newLocale}$2`
                    ),
                    { replace: true }
                );
                return;
            }
        }
    
        if (!pathLocale || !(SUPPORTED_LANGS as readonly string[]).includes(pathLang)) {
            let detected = DEFAULT_LOCALE;
            const cookieMatch = document.cookie.match(
                /i18n-l10n-conf-lang=([^;]+)/
            );
            if (cookieMatch && SUPPORTED_LOCALES.includes(cookieMatch[1])) {
                detected = cookieMatch[1];
            } else {
                const browserLang = navigator.language.replace("_", "-");
                const found = SUPPORTED_LOCALES.find((l) =>
                    browserLang.startsWith(l)
                );
                if (found) detected = found;
            }
            navigate(
                `/${detected}${location.pathname.startsWith("/") ? location.pathname : "/" + location.pathname}`.replace(
                    /\/+/g,
                    "/"
                ),
                { replace: true }
            );
        }
    }, [pathLocale, pathLang, location.pathname, navigate, SUPPORTED_LOCALES, location.search]);
    if (!pathLocale || !(SUPPORTED_LANGS as readonly string[]).includes(pathLang)) return null;
    return <>{children}</>;
};

function App() {
    return (
        <LocaleGuard>
            <ScrollToTop />

            <Routes>
                <Route path=":locale/">
                    <Route index element={<Home />} />

                    <Route path="article">
                        <Route path="rtl-icons" element={<ArticleRtlIcons />} />
                        <Route path="css" element={<ArticleCss />} />
                        <Route path="l10n-ru" element={<ArticleL10nRu />} />
                        <Route path="ui-by" element={<ArticleUiBy />} />
                        <Route path="i18n-kz" element={<ArticleI18nKz />} />
                        <Route path="en" element={<ArticleEn />} />
                        <Route path="ar" element={<ArticleAr />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </LocaleGuard>
    );
}

export default App;
