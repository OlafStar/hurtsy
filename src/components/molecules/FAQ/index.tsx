import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '~/components/ui/accordion';

const questions = [
    {
        question: 'Czym jest hurtsy?',
        answer: 'Hurtsy jest platformą B2B w której firmy wysyłają lub zbierają oferty na produkty.',
    },
    {
        question: 'Jak wygląda zbieranie ofert?',
        answer: 'Użytkownicy szukający produktów wysyłają zapytanie ofertowe aby skontaktować się z firmą oferującą. Oferty otrzymasz na email podany przy zakładaniu konta lub otrzyma go twój przedstawiciel.',
    },
    {
        question: 'Czy serwis posiad prowizję od sprzedarzy?',
        answer: 'Nie! Nasz serwis służy do połączenia firm potrzebujących produktów z firmami które je posiadają a sprzedarz prowadzona jest między nimi.',
    },
    {
        question: 'Czy wystawianie produktów kosztuje?',
        answer: 'Kosztami związanymi z wystawianiem ofert jest miesięczna subskrybcja która wpasowuje się w potrzeby twojej działalności',
    },
    {
        question: 'Czy można wypróbować serwis za darmo?',
        answer: 'Tak! Aktualnie posiadmy możliwość korzystania z planu Free posiadającego 10 darmowych ofert.',
    },
    {
        question: 'Czemu powinienem skorzystać z Hurtsy?',
        answer: 'Korzystając z naszych usług dostajecie możliwość dotarcia do klientów indywidualnych chcących zacząć prowadzić działalność jak i do klientów którzy są na rynku od wielu lat. Serwis zbudowany jest z wykorzystaniem najnowszych technologii z naciskiem na SEO.',
    },
];

const FAQ = () => {
    return (
        <div className="flex flex-col gap-8 container px-4 md:px-8">
            <div className="text-3xl font-bold">{'Często zadawane pytania'}</div>
            <div className="flex flex-col gap-4 w-full">
                {questions.map((item, index) => (
                    <div key={index} className='max-w-[1300px]'>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger className='text-left flex justify-between gap-4'>{item.question}</AccordionTrigger>
                                <AccordionContent>{item.answer}</AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
