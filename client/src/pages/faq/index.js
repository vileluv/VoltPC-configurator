import React from "react";
import styles from "./Faq.module.scss";

function FaqPage() {
    return (
        <div className={styles.root}>
            <h1>FAQ</h1>
            <div className={styles.page}><div className={styles.faqContainer}>
                <div className={styles.faqItem}>
                    <h2 className={styles.question}>1. Что такое конфигуратор ПК?</h2>
                    <p className={styles.answer}>
                        Конфигуратор ПК — это онлайн-инструмент, который помогает выбрать компоненты для сборки компьютера, исходя из ваших предпочтений и нужд. Вы выбираете процессор, видеокарту, оперативную память и другие детали, и конфигуратор подскажет, какие части совместимы между собой.
                    </p>
                </div>
                <div className={styles.faqItem}>
                    <h2 className={styles.question}>2. Как выбрать компоненты для ПК?</h2>
                    <p className={styles.answer}>
                        Выбор компонентов зависит от того, для чего вы планируете использовать ПК. Если вам нужно устройство для работы с офисными программами и серфинга в интернете, вам подойдут более дешевые компоненты. Если вы хотите играть в игры или работать с видеомонтажом, то потребуется более мощный процессор и видеокарта.
                    </p>
                </div>
                <div className={styles.faqItem}>
                    <h2 className={styles.question}>3. Какие компоненты важны для сборки ПК?</h2>
                    <p className={styles.answer}>
                        Каждый компонент имеет свою роль, и важно правильно сочетать их для получения оптимальной производительности:
                        <ul>
                            <li><strong>Процессор (CPU)</strong> — это "мозг" компьютера, который обрабатывает все данные. Чем мощнее процессор, тем быстрее будет работать ваш ПК, особенно при выполнении тяжелых задач, таких как игры или работа с графикой.</li>
                            <li><strong>Видеокарта (GPU)</strong> — ответственна за графику и обработку изображений. Для игр или видеоредактирования важно выбрать мощную видеокарту.</li>
                            <li><strong>Оперативная память (RAM)</strong> — необходима для быстрого выполнения задач и хранения данных, которые активно используются. Чем больше памяти, тем быстрее система работает, особенно при многозадачности.</li>
                            <li><strong>Накопитель (SSD или HDD)</strong> — используется для хранения ваших данных. SSD значительно быстрее и надежнее по сравнению с HDD, особенно когда речь идет о скорости загрузки операционной системы и приложений.</li>
                            <li><strong>Материнская плата (Motherboard)</strong> — соединяет все компоненты компьютера. Нужно выбирать плату, совместимую с другими выбранными комплектующими.</li>
                            <li><strong>Блок питания (PSU)</strong> — обеспечивает стабильную подачу энергии всем компонентам. Важно выбрать мощность блока питания в зависимости от потребностей системы.</li>
                        </ul>
                    </p>
                </div>
                <div className={styles.faqItem}>
                    <h2 className={styles.question}>4. Как я могу быть уверенным, что компоненты совместимы между собой?</h2>
                    <p className={styles.answer}>
                        Наш конфигуратор автоматически проверяет совместимость выбранных компонентов. Если какой-то из элементов несовместим, мы предложим вам подходящий аналог.
                    </p>
                </div>
                <div className={styles.faqItem}>
                    <h2 className={styles.question}>5. Я не знаю, какие компоненты мне нужны. Могу ли я получить помощь?</h2>
                    <p className={styles.answer}>
                        Если вы не уверены, что выбрать, не переживайте! Мы всегда готовы помочь. Просто свяжитесь с нашей службой поддержки, и наши специалисты подскажут, какие компоненты подойдут для ваших нужд.
                    </p>
                </div>
                <div className={styles.faqItem}>
                    <h2 className={styles.question}>6. Какие способы оплаты доступны?</h2>
                    <p className={styles.answer}>
                        Мы принимаем все популярные способы оплаты, включая кредитные карты, электронные кошельки и банковские переводы. Вы можете выбрать наиболее удобный для вас.
                    </p>
                </div>
                <div className={styles.faqItem}>
                    <h2 className={styles.question}>7. Можно ли вернуть компоненты, если они не подошли?</h2>
                    <p className={styles.answer}>
                        Да, вы можете вернуть компоненты в течение 14 дней с момента получения, если они не были в употреблении и сохранили товарный вид. Для этого нужно связаться с нашей службой поддержки.
                    </p>
                </div>
                <div className={styles.faqItem}>
                    <h2 className={styles.question}>8. Что делать, если я не могу найти нужную модель компонента?</h2>
                    <p className={styles.answer}>
                        Если модель компонента недоступна, мы подскажем аналог, который будет работать так же хорошо. Мы всегда стараемся предложить вам самые актуальные товары.
                    </p>
                </div>
            </div></div>
        </div>
    );
}

export default FaqPage;
