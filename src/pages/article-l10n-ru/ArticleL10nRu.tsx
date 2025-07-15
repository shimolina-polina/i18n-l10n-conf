import { type FC } from "react";
import { FormattedMessage } from "react-intl";

import { Layout } from "@/components";

import styles from "./styles.module.css";

export const ArticleL10nRu: FC = () => (
    <Layout>
        <main className={styles.article}>
            <h1>
                <FormattedMessage
                  id="articleL10nRu.title"
                  defaultMessage="How to adapt a web application for Russian users: localization nuances"
                />
            </h1>

            <p>
                <FormattedMessage
                  id="articleL10nRu.text1"
                  defaultMessage="The Russian audience is one of the largest in Eastern Europe, with more than {usersCount} internet users. At the same time, about {percent} prefer sites in Russian. When localizing, it's important to consider number formats (e.g., decimal separator is a comma), currencies and dates."
                  values={{ usersCount: 98000000, percent: 78 }}
                />
            </p>

            <p>
                <FormattedMessage
                  id="articleL10nRu.text2"
                  defaultMessage="Legal aspects should also be considered: the personal data law requires information to be stored on servers within the country. Many companies have complied with this requirement since {date}"
                  values={{ date: "September 1, 2015" }}
                />
            </p>
        </main>
    </Layout>
);
