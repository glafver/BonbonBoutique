import React from 'react';
import { Accordion, Container } from 'react-bootstrap';
import { Fade } from "react-awesome-reveal";

const faqItems = [
    {
        category: "Produktinformation",
        questions: [
            {
                question: "Vilka typer av godis erbjuder ni?",
                answer: "Vi erbjuder ett brett utbud av godis inklusive choklad, gelégodis, hårda karameller och specialtillverkade konfektyrer."
            },
            {
                question: "Har ni några sockerfria eller allergifria alternativ?",
                answer: "Ja, vi har ett urval av sockerfria och allergifria godis. Vänligen kontrollera produktetiketterna eller fråga vår personal för hjälp."
            },
            {
                question: "Kan jag skapa en egen blandning av godis?",
                answer: "Absolut! Du kan blanda och matcha dina favoriter för att skapa en personlig godispåse."
            }
        ]
    },
    {
        category: "Beställning och Leverans",
        questions: [
            {
                question: "Hur gör jag en beställning?",
                answer: "Välj de godis du vill köpa, lägg till dem i din kundvagn och fortsätt till kassan för betalning och leveransuppgifter."
            },
            {
                question: "Erbjuder ni internationell frakt?",
                answer: "För närvarande skickar vi bara inom vårt land. Prenumerera på vårt nyhetsbrev för uppdateringar om internationell frakt."
            },
            {
                question: "Kan jag spåra min beställning?",
                answer: "Ja, när din beställning har skickats får du ett spårningsnummer för att övervaka leveransstatus."
            }
        ]
    },
    {
        category: "Returer och Återbetalningar",
        questions: [
            {
                question: "Vad är er returpolicy?",
                answer: "Oöppnade varor kan returneras inom 30 dagar från köpet för full återbetalning. Observera att förgängliga varor inte kan returneras."
            },
            {
                question: "Hur returnerar jag en produkt?",
                answer: "Kontakta vår kundtjänst för att initiera en retur. Du kommer att få returinstruktioner och en returetikett för frakt."
            },
            {
                question: "Hur lång tid tar det att få en återbetalning?",
                answer: "Återbetalningar behandlas inom 5-7 arbetsdagar efter att vi mottagit den returnerade varan."
            }
        ]
    },
    {
        category: "Specialförfrågningar och Tjänster",
        questions: [
            {
                question: "Erbjuder ni catering till evenemang och fester?",
                answer: "Ja, vi erbjuder specialpaket och alternativ för större beställningar till evenemang och fester. Kontakta oss för mer information."
            },
            {
                question: "Kan jag begära en skräddarsydd godisskapelse?",
                answer: "Vi välkomnar skräddarsydda beställningar! Kontakta oss med dina idéer, så arbetar vi med dig för att skapa något speciellt."
            },
            {
                question: "Erbjuder ni presentinslagning?",
                answer: "Ja, vi erbjuder presentinslagningstjänster mot en liten extra kostnad. Du kan välja detta alternativ i kassan."
            }
        ]
    },
    {
        category: "Hälsa och Säkerhet",
        questions: [
            {
                question: "Hur säkerställer ni kvaliteten på ert godis?",
                answer: "Vi följer strikta kvalitetskontrollstandarder och hämtar våra ingredienser från ansedda leverantörer för att säkerställa högsta kvalitet."
            },
            {
                question: "Är era produkter säkra för personer med allergier?",
                answer: "Vi tillhandahåller ingredienslistor och allergeninformation för alla våra produkter. Vi rekommenderar dock att personer med svåra allergier är försiktiga."
            },
            {
                question: "Vilka åtgärder vidtar ni för livsmedelssäkerhet?",
                answer: "Vi upprätthåller en hög standard för hygien och renlighet i vår produktion och förpackningsprocess för att säkerställa livsmedelssäkerhet."
            }
        ]
    }
];


const FaqPage: React.FC = () => {
    return (
        <Container id='faq-page' className='my-5'>
            <Container className="my-5 rounded bg-bg" >
                <Fade duration={1000} triggerOnce >
                    {faqItems.map((category, index) => (
                        <div className='mb-5' key={index}>
                            <h4 style={{ marginBottom: '20px' }}>{category.category}</h4>
                            <Accordion >
                                {category.questions.map((item, idx) => (
                                    <Accordion.Item eventKey={String(idx)} key={idx}>
                                        <Accordion.Header style={{ fontWeight: '900' }}>{item.question}</Accordion.Header>
                                        <Accordion.Body style={{ fontSize: '14px' }}>{item.answer}</Accordion.Body>
                                    </Accordion.Item>
                                ))}
                            </Accordion>
                        </div>
                    ))}
                </Fade>
            </Container>
        </Container>
    );
};

export default FaqPage;
