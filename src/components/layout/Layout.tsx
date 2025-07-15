import type { FC, PropsWithChildren } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import { BRAND_NAMES } from "@/constants";
import { BrandLogoIcon, TelegramIcon, VkontakteIcon } from "@/icons";

import { LangSelect } from "../lang-select";
import styles from "./styles.module.css";

export const Layout: FC<PropsWithChildren> = ({ children }) => (
    <>
        <div className={styles.header}>
            <div className={styles.headerContent}>
                <Link className={styles.headerBrand} to="/">
                    <BrandLogoIcon />

                    <span className={styles.headerBrandText}>
                        {BRAND_NAMES["ru"]}
                    </span>
                </Link>

                <LangSelect />
            </div>
        </div>

        <div className={styles.contentContainer}>{children}</div>

        <div className={styles.footer}>
            <div
                className={styles.footerSocialLinks}
                data-testid="social-icons"
            >
                {[TelegramIcon, VkontakteIcon].map((Icon, index) => (
                    <a key={index} href="">
                        <Icon />
                    </a>
                ))}
            </div>

            <span className={styles.footerText}>
                <FormattedMessage
                    id="layout.footer.copyright"
                    defaultMessage="© {yearStart}-{yearEnd}, LLC «<link>{brand}</link>». All rights reserved"
                    values={{
                        yearStart: 2024,
                        yearEnd: 2025,
                        brand: (
                            <a className={styles.textLink} href="">
                                {BRAND_NAMES["ru"]}
                            </a>
                        ),
                        link: (chunks: React.ReactNode) => (
                            <a className={styles.textLink} href="">
                                {chunks}
                            </a>
                        ),
                    }}
                />
            </span>
        </div>
    </>
);
