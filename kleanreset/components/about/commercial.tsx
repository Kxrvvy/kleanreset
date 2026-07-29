import { Eyebrow } from "../ui/eyebrow";
import { Sparkles, RefreshCw, MessageSquare, Smile } from "lucide-react";

const VALUES = [
    {
        icon: Sparkles,
        title: "Care in Every Corner",
        description:
            "We pay attention to the details that help a space feel truly clean and cared for.",
    },
    {
        icon: RefreshCw,
        title: "Consistency You Trust",
        description:
            "We aim to provide a dependable standard of service across every visit.",
    },
    {
        icon: MessageSquare,
        title: "Honest & Transparent",
        description:
            "We believe in clear communication and straightforward service.",
    },
    {
        icon: Smile,
        title: "Customer-Focused Service",
        description:
            "We want the cleaning experience to be simple, comfortable, and convenient for our customers.",
    },
];

export function Commercial() {
    return (
        <section>
            <div className="flex flex-col items-center justify-center gap-6 bg-paper px-4 py-16 sm:px-6 md:px-8 md:py-20 lg:px-10 xl:px-12">
                <div className="w-full max-w-6xl">
                    <Eyebrow>OUR VALUES</Eyebrow>
                </div>

                <div className="w-full max-w-6xl space-y-6">
                    <h1 className="font-display text-4xl font-extrabold leading-tight text-ink md:text-[40px]">
                        The values behind every clean
                    </h1>
                </div>

                <div className="grid w-full max-w-6xl gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-4">
                    {VALUES.map(({ icon: Icon, title, description }) => (
                        <div
                            key={title}
                            className="flex w-full flex-col gap-2 rounded-card border border-line bg-card p-6 transition-all hover:-translate-y-1 hover:border-pine/30 hover:shadow-md"
                        >
                            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sea-mist/60 text-pine">
                                <Icon className="h-5 w-5" />
                            </span>

                            <div className="space-y-2">
                                <h3 className="text-[18px] font-semibold text-ink">{title}</h3>
                                <p className="text-[13px] text-ink-soft">{description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
