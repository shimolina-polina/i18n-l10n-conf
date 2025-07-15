import { type FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";

import articleAr from "@/assets/article-ar.jpg";
import articleCss from "@/assets/article-css.jpg";
import articleEn from "@/assets/article-en.jpg";
import articleI18nKz from "@/assets/article-i18n-kz.jpg";
import articleL10nRu from "@/assets/article-l10n-ru.jpg";
import articleRtlIcons from "@/assets/article-rtl-icons.jpg";
import articleUiBy from "@/assets/article-ui-by.jpg";
import { Layout } from "@/components";
import type { Locale } from "@/types";
import styles from "./styles.module.css";

import { baseLocale } from "@/locale-constants";

const ARTICLES = [
    {
        titleId: "homePage.rtlArticle.title",
        descriptionId: "homePage.rtlArticle.description",
        imageUrl: articleRtlIcons,
        articleLink: "article/rtl-icons",
    },
    {
        titleId: "homePage.cssArticle.title",
        descriptionId: "homePage.cssArticle.description",
        imageUrl: articleCss,
        articleLink: "article/css",
    },
];

const getRegionArticleByLocale = (locale: Locale) => {
    switch (locale) {
        case "ru":
        case "ru-RU":
            return {
                titleId: "homePage.ruArticle.title",
                descriptionId: "homePage.ruArticle.description",
                imageUrl: articleL10nRu,
                articleLink: "article/l10n-ru",
            };
        case "ru-BY":
            return {
                titleId: "homePage.byArticle.title",
                descriptionId: "homePage.byArticle.description",
                imageUrl: articleUiBy,
                articleLink: "article/ui-by",
            };
        case "ru-KZ":
            return {
                titleId: "homePage.kzArticle.title",
                descriptionId: "homePage.kzArticle.description",
                imageUrl: articleI18nKz,
                articleLink: "article/i18n-kz",
            };
        case "ar":
            return {
                titleId: "homePage.arArticle.title",
                descriptionId: "homePage.arArticle.description",
                imageUrl: articleAr,
                articleLink: "article/ar",
            };
        case "en":
        default:
            return {
                titleId: "homePage.enArticle.title",
                descriptionId: "homePage.enArticle.description",
                imageUrl: articleEn,
                articleLink: "article/en",
            };
    }
};

export const Home: FC = () => {
    const intl = useIntl();

    const { titleId, descriptionId, imageUrl, articleLink } = getRegionArticleByLocale(baseLocale);
    console.log(baseLocale);

    return (
        <Layout>
            <main className={styles.content}>
                <section className={styles.hero}>
                    <h1 className={styles.heroTitle}>
                        <FormattedMessage id="homePage.hero.title" defaultMessage="Connecting digital worlds in all languages" />
                    </h1>

                    <div className={styles.heroDetails}>
                        <span className={styles.heroDetailsItem}>
                            <FormattedMessage id="homePage.hero.conference" defaultMessage="I&L Conference {year}" values={{ year: 2025 }} />
                        </span>
                        <span className={styles.heroDetailsItem}>
                            <FormattedMessage id="homePage.hero.date" defaultMessage="August 15, 2025" />
                        </span>
                        <span className={styles.heroDetailsItem}>
                            <FormattedMessage id="homePage.hero.location" defaultMessage="Moscow, Russia" />
                        </span>
                        <span className={styles.heroDetailsItem}>
                            <FormattedMessage id="homePage.hero.price" defaultMessage="{price} ticket" values={{ price: "35,000.00 ₽" }} />
                        </span>
                    </div>

                    <a className={styles.heroRegister} href="">
                        <FormattedMessage id="homePage.hero.register" defaultMessage="Register" />
                    </a>
                </section>

                <section className={styles.regionArticle}>
                    <h2 className={styles.regionArticleTitle}>
                        <FormattedMessage id="homePage.regionArticle.title" defaultMessage="Relevant for your region" />
                    </h2>

                    <Link className={styles.articleCard} to={articleLink}>
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>
                                <FormattedMessage id={titleId} defaultMessage="Article title" />
                            </h3>
                            <p className={styles.cardDescription}>
                                <FormattedMessage id={descriptionId} defaultMessage="Article description" />
                            </p>
                            <span className={styles.cardRead}>
                                <FormattedMessage id="homePage.article.read" defaultMessage="Read" />
                            </span>
                        </div>
                        <img className={styles.cardImage} src={imageUrl} />
                    </Link>
                </section>

                <section className={styles.articles}>
                    <h2 className={styles.articlesTitle}>
                        <FormattedMessage id="homePage.articles.title" defaultMessage="Articles" />
                    </h2>

                    {ARTICLES.length > 0 && (
                        <p className={styles.articlesDescription}>
                            {intl.formatMessage(
                                { id: "homePage.articles.description", defaultMessage: "Total {count, plural, one {# article} other {# articles}}" },
                                { count: ARTICLES.length }
                            )}
                        </p>
                    )}

                    <div className={styles.articlesList}>
                        {ARTICLES.map(
                            (
                                { titleId, descriptionId, imageUrl, articleLink },
                                index
                            ) => (
                                <Link
                                    key={index}
                                    className={styles.articleCard}
                                    to={articleLink}
                                >
                                    <div className={styles.cardContent}>
                                        <h3 className={styles.cardTitle}>
                                            <FormattedMessage id={titleId} defaultMessage="Article title" />
                                        </h3>
                                        <p className={styles.cardDescription}>
                                            <FormattedMessage id={descriptionId} defaultMessage="Article description" />
                                        </p>
                                        <span className={styles.cardRead}>
                                            <FormattedMessage id="homePage.article.read" defaultMessage="Read" />
                                        </span>
                                    </div>
                                    <img
                                        className={styles.cardImage}
                                        src={imageUrl}
                                    />
                                </Link>
                            )
                        )}
                    </div>
                </section>
            </main>
        </Layout>
    );
};
