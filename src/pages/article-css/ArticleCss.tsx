import { type FC } from "react";
import { FormattedMessage } from "react-intl";

import { Layout } from "@/components";

import styles from "./styles.module.css";

export const ArticleCss: FC = () => (
    <Layout>
        <main className={styles.article}>
            <h1>
                <FormattedMessage
                    id="articleCss.title"
                    defaultMessage="Using Logical CSS Properties for Internationalized Interfaces"
                />
            </h1>

            <p>
                <FormattedMessage
                    id="articleCss.intro"
                    defaultMessage="In recent years, more attention has been paid to creating truly global web products. This is especially relevant for projects whose audience is distributed worldwide. When developing interfaces in languages such as Arabic, where text and layout direction go from right to left (RTL), it's important that the visual behavior of components remains intuitive. One of the key tools for this is logical CSS properties."
                />
            </p>

            <p>
                <FormattedMessage
                    id="articleCss.diff"
                    defaultMessage={
                        "Unlike physical properties (e.g., <code>margin-left</code>, <code>padding-right</code>, <code>border-top</code>), logical properties (<code>margin-inline-start</code>, <code>padding-block-end</code>, <code>border-inline</code>) describe behavior relative to the writing direction rather than a fixed screen direction. This is especially important in projects where content can be in English, Arabic, Chinese, Russian, and other languages with different directions."
                    }
                    values={{
                        code: (chunks: React.ReactNode) => (
                            <code>{chunks}</code>
                        ),
                    }}
                />{" "}
            </p>

            <section className={styles.section}>
                <h2>
                    <FormattedMessage
                        id="articleCss.whyImportant.title"
                        defaultMessage="Why This Matters for i18n Frontend"
                    />
                </h2>

                <p>
                    <FormattedMessage
                        id="articleCss.whyImportant.text"
                        defaultMessage="Using logical properties makes the code more adaptive and reduces the need for conditional styles or CSS duplication. It also simplifies maintenance, especially in multilingual products where switching between LTR and RTL should be as seamless as possible."
                    />
                </p>

                <p>
                    <FormattedMessage
                        id="articleCss.whyImportant.list"
                        defaultMessage={
                            "Here are some benefits of logical properties in the context of internationalization: <ul><li>Universality: one set of styles fits all writing directions.</li><li>Easier maintenance: less code, fewer errors when making changes.</li><li>Flexibility: easy to add new languages without changing the style structure.</li><li>Consistency: the same visual behavior for all users, regardless of language.</li><li>Relevance: compliance with modern CSS standards and UI design best practices.</li></ul>"
                        }
                        values={{
                            ul: (chunks: React.ReactNode) => <ul className={styles.list}>{chunks}</ul>,
                            li: (chunks: React.ReactNode) => <li>{chunks}</li>,
                        }}
                    />
                </p>
            </section>

            <section className={styles.section}>
                <h2>
                    <FormattedMessage
                        id="articleCss.conclusion.title"
                        defaultMessage="Conclusion"
                    />
                </h2>

                <p>
                    <FormattedMessage
                        id="articleCss.conclusion.text"
                        defaultMessage="Using logical CSS properties is a simple and effective way to make interfaces truly adaptive and globally oriented. This approach allows for consideration of linguistic and cultural differences without complicating the code or duplicating styles."
                    />
                </p>
            </section>
        </main>
    </Layout>
);
