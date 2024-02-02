const shippingMethods = [
    { value: 'postnord', label: 'Postnord', price: 69, image: 'https://www.postnord.se/siteassets/logos-and-badges/pn_color_rgb_20162.png' },
    { value: 'earlybird', label: 'Earlybird', price: 49, image: 'https://faglasang.com/wp-content/uploads/2022/12/earlybird.png' },
    { value: 'budbee', label: 'Budbee', price: 39, image: 'https://montafulfilment.com/en/wp-content/uploads/sites/3/2023/06/Budbee-integration.png' },
    { value: 'instabox', label: 'Instabox', price: 39, image: 'https://images.prismic.io/logtrade/323f0f56-5838-4aa4-a7a9-c0d9f488cb41_instabox.png?auto=compress,format' },
];

const paymentMethods = [
    { value: 'visa', label: 'Visa', image: 'https://img.icons8.com/color/48/visa.png' },
    { value: 'mastercard', label: 'Mastercard', image: 'https://img.icons8.com/color/48/mastercard.png' },
    { value: 'union', label: 'UnionPay', image: 'https://img.icons8.com/color/48/unionpay.png' }
];

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

const contactsMap = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2248.599104369378!2d13.00075931592569!3d55.60587398052919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465397f63e1619ab%3A0x259675b1d673668b!2sVagnmakarebyn%203C%2C%20213%2077%20Malm%C3%B6%2C%20Sweden!5e0!3m2!1sen!2sus!4v1631293421931!5m2!1sen!2sus";

const testData = {
    customer_first_name: 'Test',
    customer_last_name: 'Testsson',
    customer_address: 'Testgatan 1',
    customer_postcode: '123456',
    customer_city: 'Teststad',
    customer_email: 'test@test.se',
    customer_phone: '123456789',
    card_number: '1111222233334444',
    name_on_card: 'Test Testsson',
    due_date: '11/99',
    cvc: '123',
    shipping_method: 'postnord',
    payment_method: 'visa'
};

export { shippingMethods, paymentMethods, faqItems, contactsMap, testData };