import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Гайд: Бизнес на Kaspi через Предзаказ — полный enterprise-разбор",
  description:
    "Максимально детальное руководство: как запустить бизнес на Kaspi.kz через механику Предзаказа без склада и больших вложений. Условия Kaspi, кейсы топ-селлеров (Бухонин, AlgaTop), ниши, комиссии 2026, лайфхаки, риски, пошаговая инструкция.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
