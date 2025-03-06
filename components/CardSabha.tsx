'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

type CardSabhaProps = {
    title: string;
    sabhaicon: any;
};
export default function CardSabha({ title, sabhaicon }: CardSabhaProps) {
    const [count, setCount] = useState(0);

    return (
        <div className="space-y-4 md:pb-4 pb-20">
        <Card className="flex flex-col flex-shrink-0 bg-background h-full w-full lg:w-auto">
            <CardContent className="flex-1 pb-0 flex flex-col items-center">
            <div className="relative w-40 h-60">
                <Image src={sabhaicon} alt="Sabha Counter" layout="fill" objectFit="contain" />
                <div
                    className={`absolute top-14 right-8 text-gray-800 font-Digital ${count > 1000 ? 'text-4xl' : 'text-5xl'}`} >
                    {count}
                </div>
                <button
                    className="absolute bottom-9 left-1/2 transform -translate-x-1/2 w-16 h-16"
                    onClick={() => setCount(count + 1)}
                ></button>
                <button
                    onClick={() => setCount(0)}
                    style={{
                        border: 'none',
                        width: '18px',
                        height: '18px',
                        position: 'absolute',
                        zIndex: 10,
                        right: '31px',
                        top: '125px',
                    }}
                ></button>
            </div>
            <h2 className="py-5 text-xl sm:text-1xl" style={{ textAlignLast: "center" }}>{title}</h2>
        </CardContent>
        </Card>
        </div>
    );
}
