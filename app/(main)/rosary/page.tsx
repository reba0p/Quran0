"use client";
import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";
import CardSabha from "@/components/CardSabha";

type SabhaData = {
  id: number;
  image: any;
  title: string;
  descr: string;
};

const sabhadata: SabhaData[] = [
  {
    id: 1,
    image: "/soha2.png",
    title: "لا إله إلا الله وحده لا شريك له ، له الملك وله الحمد وهو على كل شيء قدير .",
    descr: "قال رسول الله صلى الله عليه وسلم : خير الدعاء دعاء يوم عرفه ، وخير ما قلت أنا والنبيون من قبلي :   لا إله إلا الله وحده لا شريك له ، له الملك وله الحمد وهو على كل شيء قدير .",
  },
  {
    id: 2,
    image: "/soha.png",
    title: "اللهمَّ إنك عفوٌّ تُحبُّ العفوَ فاعفُ عنِّي",
    descr: "قلتُ : يا رسولَ اللهِ أرأيتَ إن علمتُ أيَّ ليلةِ القدرِ ما أقولُ فيها ؟ قال : قولي : اللهمَّ إنك عفوٌّ تُحبُّ العفوَ فاعفُ عنِّي",
  },
  {
    id: 3,
    image: "/soha2.png",
    title: "سبحان الله وبحمده عدد خلقه ورضا نفسه وزنة عرشه ومداد كلماته",
    descr: "قال ﷺ:   ” لقد قلت بعدك أربع كلمات ثلاث مرات لو وزنت بما قلت منذ اليوم لوزنته سبحان الله وبحمده عدد خلقه ورضا نفسه وزنة عرشه ومداد كلماته",
  },
  {
    id: 4,
    image: "/soha.png",
    title: "اللهم صل وسلم على نبينا محمد",
    descr: "قال ﷺ:“من صلى عليَّ صلاة صلى الله عليه بها عشراً ” مسلم 384",
  },
  {
    id: 5,
    image: "/soha2.png",
    title: "أستغفر الله الذى لا إله إلا هو الحى القيوم وأتوب إليه",
    descr: "",
  },
  {
    id: 6,
    image: "/soha.png",
    title: "اللَّهُمَّ إنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا، ولَا يَغْفِرُ الذُّنُوبَ إلَّا أنْتَ، فَاغْفِرْ لي مَغْفِرَةً مِن عِندِكَ، وارْحَمْنِي، إنَّكَ أنْتَ الغَفُورُ الرَّحِيمُ",
    descr: "",
  },
  {
    id: 7,
    image: "/soha2.png",
    title: "سبحان الله العظيم وبحمده",
    descr: "",
  },
];

export default function RosaryPage() {
  const t = useTranslations("RosaryPage");

  // State to simulate loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="size-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="flex items-center gap-2 text-xl font-semibold">
          <div className="h-9 w-1.5 rounded-full bg-primary" />
          {t("rosary")}
        </h1>
      </div>

      <div className="between">
        {loading ? (
          <LoadingSkeleton />
        ) : (
          sabhadata.map((item) => (
            <CardSabha key={item.id} title={item.title} sabhaicon={item.image} />
          ))
        )}
      </div>
    </div>
  );
}

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5 justify-items-start P m-3">
    <Skeleton className="h-40 w-full" />
    <Skeleton className="h-40 w-full" />
    <Skeleton className="h-40 w-full" />
  </div>
);
