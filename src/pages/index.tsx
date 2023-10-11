import Head from "next/head";
import TableImg from "../assets/images/table.png";
import Image from "next/image";
import styles from "./index.module.css";
import Info from "~/components/icons/Info";
import Microphone from "~/components/icons/Microphone";
import Gear from "~/components/icons/Gear";
import RegistrationImg from "../assets/images/registration.png";
import ResearchImg from "../assets/images/platform-research.png";
import PlacingOrdersImg from "../assets/images/placing-the-orders.png";
import Header from "~/components/Header";
import { type GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "~/server/auth";

export default function Home() {
  return (
    <>
      <Head>
        <title>Sols estate</title>
        <meta name="description" content="" />
      </Head>
      <Header />
      <section
        className={`${styles.welcomeScreenBg} flex flex-col items-center pb-40 pt-20 sm:pb-32 sm:pt-12 md:pt-40`}
      >
        <h1 className="mb-28 text-center text-5xl font-bold leading-tight text-gray-900 sm:text-xl md:mb-0 md:text-3xl xl:text-4xl">
          Поиск предложений
          <br />
          по недвижимости
          <br />
          для агентов и покупателей
        </h1>
        <Image
          src={TableImg}
          alt="Предложения по недвижимости"
          width={990}
          height={148}
          className="md:hidden"
        />
      </section>
      <section className="mb-40 flex flex-col items-center sm:mb-20 md:pt-10 lg:mb-32">
        <h2 className="mb-9 text-3xl font-bold sm:mb-5 sm:text-lg xl:text-2xl">
          Наши преимущества
        </h2>
        <div className="flex w-full gap-4 lg:flex-col">
          <article className="flex-1 rounded-md border border-gray-200 p-6 sm:p-5">
            <h3 className="mb-2 text-xl font-medium sm:text-base">
              Все участники рынка в одном месте
            </h3>
            <p className="text-sm font-normal leading-snug text-neutral-500 sm:text-xs">
              Платформа объединяет агентов, агентства и клиентов, упрощая
              процесс взаимодействия и поиска нужных контактов
            </p>
          </article>
          <article className="flex-1 rounded-md border border-gray-200 p-6 sm:p-5">
            <h3 className="mb-2 text-xl font-medium sm:text-base">
              Персонализированный опыт
            </h3>
            <p className="text-sm font-normal leading-snug text-neutral-500 sm:text-xs">
              Возможность добавления агентов в избранное или черный список на
              основе личного опыта, а в будущем и рейтинга, создает
              индивидуальную и доверительную среду для сотрудничества
            </p>
          </article>
          <article className="flex-1 rounded-md border border-gray-200 p-6 sm:p-5">
            <h3 className="mb-2 text-xl font-medium sm:text-base">
              Безопасность и доступность
            </h3>
            <p className="text-sm font-normal leading-snug text-neutral-500 sm:text-xs">
              С помощью личных кабинетов и авторизации через почту участники
              могут быть уверены в безопасности своих данных. Первая версия
              продукта абсолютно бесплатна, что делает ее доступной для широкой
              аудитории
            </p>
          </article>
        </div>
      </section>
      <section className="mb-40 flex flex-col items-center sm:mb-20 lg:mb-32">
        <h2 className="mb-1 text-3xl font-bold sm:text-lg xl:text-2xl">
          Инновации и постоянное развитие
        </h2>
        <p className="mb-9 text-sm font-normal text-neutral-500 sm:mb-5 sm:text-xs">
          В будующих версиях мы планируем реализовать
        </p>
        <div className="flex w-full gap-4 lg:flex-col">
          <article className="flex flex-1 items-center gap-4 rounded-md border border-gray-200 p-6 sm:p-5">
            <div className="shrink-0">
              <Info className="sm:w-6" />
            </div>
            <p className="text-sm font-normal leading-snug text-neutral-500 sm:text-xs">
              Уведомления при поступлении релевантных запросов для максимального
              удобства пользователей
            </p>
          </article>
          <article className="flex flex-1 items-center gap-4 rounded-md border border-gray-200 p-6 sm:p-5">
            <div className="shrink-0">
              <Microphone className="sm:w-6" />
            </div>
            <p className="text-sm font-normal leading-snug text-neutral-500 sm:text-xs">
              Голосовое размещение запроса в систему с помощью ИИ, упрощая и
              ускоряя процесс публикации
            </p>
          </article>
          <article className="flex flex-1 items-center gap-4 rounded-md border border-gray-200 p-6 sm:p-5">
            <div className="shrink-0">
              <Gear className="sm:w-6" />
            </div>
            <p className="text-sm font-normal leading-snug text-neutral-500 sm:text-xs">
              Автоматический ответ на запрос при совпадении параметров, повышая
              эффективность взаимодействия между пользователями
            </p>
          </article>
        </div>
      </section>
      <section className="mb-40 flex flex-col items-center sm:mb-20 lg:mb-32">
        <h2 className="mb-12 text-3xl font-bold sm:mb-5 sm:text-lg xl:text-2xl">
          Процесс работы агентов с нами
        </h2>
        <article className="mb-16 flex max-w-[942px] items-center gap-16 last:mb-0 sm:mb-12 sm:gap-6 md:mb-20 md:max-w-[380px] md:flex-col lg:gap-10">
          <div className="md:order-1">
            <h3 className="mb-3 text-xl font-medium sm:text-base">
              Регистрация и создание профиля
            </h3>
            <p className="text-sm font-normal leading-snug text-neutral-500 sm:text-xs">
              Для создания профиля нужно заполнить только нужную информацию, что
              займет не более пары минут. В процессе регистрации указывается
              специализация, а также добавляются контактные данные месенджеров
              для оперативной связи с партнерами - другими агентствами или
              клиентами
            </p>
          </div>
          <Image
            src={RegistrationImg}
            width={440}
            height={250}
            alt="Пример регистрации и создания профиля"
            className="md:w-full lg:w-1/2"
          />
        </article>
        <article className="mb-16 flex max-w-[942px] items-center gap-16 sm:mb-12 sm:gap-6 md:mb-20 md:max-w-[380px] md:flex-col lg:gap-10">
          <Image
            src={ResearchImg}
            width={440}
            height={250}
            alt="Пример изучения и настройки платформы"
            className="md:w-full lg:w-1/2"
          />
          <div>
            <h3 className="mb-3 text-xl font-medium sm:text-base">
              Изучение и настройка платформы
            </h3>
            <p className="text-sm font-normal leading-snug text-neutral-500 sm:text-xs">
              Наша платформа предоставляет обширные возможности по настройке
              отображения предложений. Устанавливая фильтры, можно отобразить
              запросы, касающиеся только аренды апартаментов на конкретные даты
              по разным ценам. Также пресутствует возможность добавлять других
              агентов в избранное и &quot;черный список&quot;
            </p>
          </div>
        </article>
        <article className="flex max-w-[942px] items-center gap-16 sm:mb-12 sm:gap-6 md:max-w-[380px] md:flex-col lg:gap-10">
          <div className="md:order-1">
            <h3 className="mb-3 text-xl font-medium sm:text-base">
              Размещение запросов
            </h3>
            <p className="text-sm font-normal leading-snug text-neutral-500 sm:text-xs">
              Каждый агент может разместить запрос с конкретным набором
              параметров, таких как стоимость, комиссия агентства, локация и
              даты размещения. Другие Агентства и агенты, видя этот запрос,
              могут предлагать свободные апартаменты на указанные даты с
              заданными параметрами.
            </p>
          </div>
          <Image
            src={PlacingOrdersImg}
            width={440}
            height={250}
            alt="Пример размещения запросов"
            className="md:w-full lg:w-1/2"
          />
        </article>
      </section>
      <footer className="flex items-center justify-between py-8 sm:flex-col sm:gap-5 sm:py-6">
        <p className="text-sm font-normal">LLC Sols Estates</p>
        <div className="flex items-center gap-5 sm:flex-col sm:gap-2">
          <a href="#!" className="text-sm font-medium text-neutral-500">
            Политика конфиденциальности
          </a>
          <a href="#!" className="text-sm font-medium text-neutral-500">
            Условия пользования
          </a>
        </div>
      </footer>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);

  return {
    props: {
      session,
    },
  };
}
