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
import { getSession } from "next-auth/react";
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
        className={`${styles.welcomeScreenBg} flex flex-col items-center pb-40 pt-20`}
      >
        <h1 className="mb-28 text-center text-5xl font-bold leading-tight text-gray-900">
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
        />
      </section>
      <section className="mb-40 flex flex-col items-center">
        <h2 className="mb-9 text-3xl font-bold">Наши преимущества</h2>
        <div className="flex w-full gap-4">
          <article className="flex-1 rounded-md border border-gray-200 p-6">
            <h3 className="mb-2 text-xl font-medium">
              Все участники рынка в одном месте
            </h3>
            <p className="text-sm font-normal leading-snug text-neutral-500">
              Платформа объединяет агентов, агентства и клиентов, упрощая
              процесс взаимодействия и поиска нужных контактов
            </p>
          </article>
          <article className="flex-1 rounded-md border border-gray-200 p-6">
            <h3 className="mb-2 text-xl font-medium">
              Персонализированный опыт
            </h3>
            <p className="text-sm font-normal leading-snug text-neutral-500">
              Возможность добавления агентов в избранное или черный список на
              основе личного опыта, а в будущем и рейтинга, создает
              индивидуальную и доверительную среду для сотрудничества
            </p>
          </article>
          <article className="flex-1 rounded-md border border-gray-200 p-6">
            <h3 className="mb-2 text-xl font-medium">
              Безопасность и доступность
            </h3>
            <p className="text-sm font-normal leading-snug text-neutral-500">
              С помощью личных кабинетов и авторизации через почту участники
              могут быть уверены в безопасности своих данных. Первая версия
              продукта абсолютно бесплатна, что делает ее доступной для широкой
              аудитории
            </p>
          </article>
        </div>
      </section>
      <section className="mb-40 flex flex-col items-center">
        <h2 className="mb-1 text-3xl font-bold">
          Инновации и постоянное развитие
        </h2>
        <p className="mb-9 text-sm font-normal text-neutral-500">
          В будующих версиях мы планируем реализовать
        </p>
        <div className="flex w-full gap-4">
          <article className="flex flex-1 items-center gap-4 rounded-md border border-gray-200 p-6">
            <div className="shrink-0">
              <Info />
            </div>
            <p className="text-sm font-normal leading-snug text-neutral-500">
              Уведомления при поступлении релевантных запросов для максимального
              удобства пользователей
            </p>
          </article>
          <article className="flex flex-1 items-center gap-4 rounded-md border border-gray-200 p-6">
            <div className="shrink-0">
              <Microphone />
            </div>
            <p className="text-sm font-normal leading-snug text-neutral-500">
              Голосовое размещение запроса в систему с помощью ИИ, упрощая и
              ускоряя процесс публикации
            </p>
          </article>
          <article className="flex flex-1 items-center gap-4 rounded-md border border-gray-200 p-6">
            <div className="shrink-0">
              <Gear />
            </div>
            <p className="text-sm font-normal leading-snug text-neutral-500">
              Автоматический ответ на запрос при совпадении параметров, повышая
              эффективность взаимодействия между пользователями
            </p>
          </article>
        </div>
      </section>
      <section className="mb-40 flex flex-col items-center">
        <h2 className="mb-12 text-3xl font-bold">
          Процесс работы агентов с нами
        </h2>
        <article className="mb-16 flex max-w-[942px] items-center gap-16 last:mb-0">
          <div>
            <h3 className="mb-3 text-xl font-medium">
              Регистрация и создание профиля
            </h3>
            <p className="text-sm font-normal leading-snug text-neutral-500">
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
          />
        </article>
        <article className="mb-16 flex max-w-[942px] items-center gap-16">
          <Image
            src={ResearchImg}
            width={440}
            height={250}
            alt="Пример изучения и настройки платформы"
          />
          <div>
            <h3 className="mb-3 text-xl font-medium">
              Изучение и настройка платформы
            </h3>
            <p className="text-sm font-normal leading-snug text-neutral-500">
              Наша платформа предоставляет обширные возможности по настройке
              отображения предложений. Устанавливая фильтры, можно отобразить
              запросы, касающиеся только аренды апартаментов на конкретные даты
              по разным ценам. Также пресутствует возможность добавлять других
              агентов в избранное и &quot;черный список&quot;
            </p>
          </div>
        </article>
        <article className="flex max-w-[942px] items-center gap-16">
          <div>
            <h3 className="mb-3 text-xl font-medium">Размещение запросов</h3>
            <p className="text-sm font-normal leading-snug text-neutral-500">
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
          />
        </article>
      </section>
      <footer className="flex items-center justify-between py-8">
        <p className="text-sm font-normal">LLC Sols Estates</p>
        <div className="flex items-center gap-5">
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
