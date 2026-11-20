
const sammlungen = {
    mehrdeutig: [
        {
            frage: "Was erkennen Sie zuerst? Was sehen Sie beim zweiten Blick?",
            bild: "images/mehrdeutige_bilder/mehrdeutig-01.png",
            aufloesung: "images/mehrdeutige_bilder/mehrdeutig-01-aufloesung.png"
        },
        {
            frage: "Welche zwei Motive erkennen Sie?",
            bild: "images/mehrdeutige_bilder/mehrdeutig-02.png",
            aufloesung: "images/mehrdeutige_bilder/mehrdeutig-02-aufloesung.png"
        },
        {
            frage: "Was entdecken Sie in diesem Bild?",
            bild: "images/mehrdeutige_bilder/mehrdeutig-03.png",
            aufloesung: "images/mehrdeutige_bilder/mehrdeutig-03-aufloesung.png"
        },
        {
            frage: "Können Sie ein zweites Motiv erkennen?",
            bild: "images/mehrdeutige_bilder/mehrdeutig-04.png",
            aufloesung: "images/mehrdeutige_bilder/mehrdeutig-04-aufloesung.png"
        },
        {
            frage: "Welche versteckten Formen sehen Sie?",
            bild: "images/mehrdeutige_bilder/mehrdeutig-05.png",
            aufloesung: "images/mehrdeutige_bilder/mehrdeutig-05-aufloesung.png"
        },
        {
            frage: "Wie viele Motive können Sie entdecken?",
            bild: "images/mehrdeutige_bilder/mehrdeutig-06.png",
            aufloesung: "images/mehrdeutige_bilder/mehrdeutig-06-aufloesung.png"
        },
        {
            frage: "Was täuscht Ihre Wahrnehmung?",
            bild: "images/mehrdeutige_bilder/mehrdeutig-07.png",
            aufloesung: "images/mehrdeutige_bilder/mehrdeutig-07-aufloesung.png"
        },
        {
            frage: "Betrachten Sie das Bild aufmerksam. Was entdecken Sie?",
            bild: "images/mehrdeutige_bilder/mehrdeutig-08.png",
            aufloesung: "images/mehrdeutige_bilder/mehrdeutig-08-aufloesung.png"
        },
        {
            frage: "Wie viele Leoparden entdecken Sie im Urwald?",
            bild: "images/mehrdeutige_bilder/leopard_suchbild.png",
            aufloesung: "images/mehrdeutige_bilder/leopard_aufloesung.png"
        },

        {
            fragen: [
                "Finden Sie das Eichhörnchen, die Eule, den Igel, die Katze und den Eisvogel.",
                "Suchen Sie den Teddybären, den Fußball, den Gartenzwerg, das Segelboot und das Fernglas.",
                "Entdecken Sie das Vogelhaus, das Windspiel, die Gießkanne, die Schubkarre und die Milchkanne.",
                "Wo finden Sie die Landkarte, den Kompass, die Lupe, den Pilz und die Libelle?"
            ],
            bild: "images/mehrdeutige_bilder/Versteckte_Objekte_am_Cottage_im_Abendlicht.png"
        }

    ],

    hypnose: [

        {
            frage: "Betrachten Sie die Mitte der Spirale und entspannen Sie sich.",
            bild: "images/hypnose/spirale.gif"
        },
        {
            frage: "Schauen Sie entspannt auf die Mitte des Tunnels.",
            bild: "images/hypnose/tunnel.gif"
        },
        {
            frage: "Beobachten Sie die fließenden Farben und lassen Sie Ihren Blick ruhen.",
            bild: "images/hypnose/wabern.gif"
        }


    ]
};

const registerTabs = document.querySelectorAll(".register-tab");
const experimentTabs = document.querySelectorAll(".experiment-tab");

const startseite = document.getElementById("startseite");
const bildseite = document.getElementById("bildseite");
const warnseite = document.getElementById("warnseite");
const wahnsinnExperiment = document.getElementById("wahnsinn-experiment");

const anzeigen = document.getElementById("anzeigen");
const bild = document.getElementById("taeuschungsbild");
const aufgabe = document.getElementById("aufgabe");
const bildfehler = document.getElementById("bildfehler");
const bildnummer = document.getElementById("bildnummer");

const zurueck = document.getElementById("zurueck");
const weiter = document.getElementById("weiter");
const aufloesung = document.getElementById("aufloesung");

const warnungStop = document.getElementById("warnung-stop");
const warnungWeiter = document.getElementById("warnung-weiter");
const experimentStop = document.getElementById("experiment-stop");

let aktiverBereich = "start";
let aktuellerIndex = 0;
let istAufloesung = false;

function aktuellerEintrag() {
    const liste = sammlungen[aktiverBereich] || [];
    return liste[aktuellerIndex];
}

function bildVorbereiten() {
    const liste = sammlungen[aktiverBereich] || [];
    const eintrag = aktuellerEintrag();

    bild.hidden = true;
    bild.removeAttribute("src");

    bildfehler.hidden = true;
    bildfehler.textContent = "";

    anzeigen.hidden = !eintrag;
    aufloesung.hidden = true;

    istAufloesung = false;
    aufloesung.textContent = "Auflösung anzeigen";

    if (!eintrag) {
        aufgabe.textContent = "Hier sind noch keine Bilder hinterlegt.";
        bildnummer.textContent = "";
        zurueck.disabled = true;
        weiter.disabled = true;
        return;
    }


    if (eintrag.fragen) {
        let zufall;

        do {
            zufall = Math.floor(Math.random() * eintrag.fragen.length);
        } while (
            eintrag.fragen.length > 1 &&
            zufall === eintrag.letzteFrage
        );

        eintrag.letzteFrage = zufall;
        aufgabe.textContent = eintrag.fragen[zufall];

    } else {
        aufgabe.textContent = eintrag.frage;
    }


    bildnummer.textContent =
        (aktuellerIndex + 1) + " / " + liste.length;

    zurueck.disabled = aktuellerIndex === 0;
    weiter.disabled = aktuellerIndex === liste.length - 1;
}

function bereichWechseln(bereich) {
    medienStoppen();
    aktiverBereich = bereich;
    aktuellerIndex = 0;

    registerTabs.forEach(tab => {
        const aktiv = tab.dataset.bereich === bereich;

        tab.classList.toggle("aktiv", aktiv);
        tab.setAttribute("aria-pressed", String(aktiv));
    });

    startseite.hidden = bereich !== "start";

    bildseite.hidden =
        bereich !== "mehrdeutig" &&
        bereich !== "hypnose";

    warnseite.hidden = bereich !== "wahnsinn";
    wahnsinnExperiment.hidden = true;

    bild.hidden = true;
    bild.removeAttribute("src");

    if (bereich === "mehrdeutig" || bereich === "hypnose") {
        bildVorbereiten();
    }
}

function experimentWechseln(experiment) {
    medienStoppen();
    kamera.dataset.effekt = experiment;
    experimentTabs.forEach(tab => {
        const aktiv = tab.dataset.experiment === experiment;

        tab.classList.toggle("aktiv", aktiv);
        tab.setAttribute("aria-pressed", String(aktiv));
    });

    document.querySelectorAll(".experiment-seite").forEach(seite => {
        seite.hidden = seite.id !== experiment + "-bereich";
    });
}

function zumStart() {
    bereichWechseln("start");
}

registerTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        bereichWechseln(tab.dataset.bereich);
    });
});

anzeigen.addEventListener("click", () => {
    const eintrag = aktuellerEintrag();

    if (!eintrag) {
        return;
    }

    bild.src = eintrag.bild;
    bild.alt = "Suchbild";
    bild.hidden = false;

    anzeigen.hidden = true;
    aufloesung.hidden = !eintrag.aufloesung;
});

aufloesung.addEventListener("click", () => {
    const eintrag = aktuellerEintrag();

    if (!eintrag || !eintrag.aufloesung) {
        return;
    }

    istAufloesung = !istAufloesung;

    if (istAufloesung) {
        bild.src = eintrag.aufloesung;
        bild.alt = "Auflösung des Suchbildes";
        aufloesung.textContent = "Original anzeigen";
    } else {
        bild.src = eintrag.bild;
        bild.alt = "Suchbild";
        aufloesung.textContent = "Auflösung anzeigen";
    }
});

zurueck.addEventListener("click", () => {
    if (aktuellerIndex > 0) {
        aktuellerIndex--;
        bildVorbereiten();
    }
});

weiter.addEventListener("click", () => {
    const liste = sammlungen[aktiverBereich] || [];

    if (aktuellerIndex < liste.length - 1) {
        aktuellerIndex++;
        bildVorbereiten();
    }
});

bild.addEventListener("error", () => {
    bild.hidden = true;
    bildfehler.hidden = false;
    bildfehler.textContent =
        "Bilddatei nicht gefunden: " + bild.getAttribute("src");
});

bild.addEventListener("load", () => {
    bildfehler.hidden = true;
});

warnungStop.addEventListener("click", zumStart);
experimentStop.addEventListener("click", zumStart);

warnungWeiter.addEventListener("click", () => {
    warnseite.hidden = true;
    wahnsinnExperiment.hidden = false;

    experimentWechseln("alkohol");
});

experimentTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        experimentWechseln(tab.dataset.experiment);
    });
});

document.addEventListener("keydown", event => {
    if (aktiverBereich !== "wahnsinn") {
        return;
    }

    if (event.code === "Space" || event.key === "Escape") {
        event.preventDefault();
        zumStart();
    }
});

const medienStart = document.getElementById("medien-start");
const medienStatus = document.getElementById("medien-status");
const kamera = document.getElementById("kamera-bild");
const kameraRahmen = document.getElementById("kamera-rahmen");
const kameraGeist = document.getElementById("kamera-geist");
const mikrofonPegel = document.getElementById("mikrofon-pegel");

let medienStream = null;
let audioKontext = null;
let pegelAnimation = null;
let anfrageNummer = 0;

function medienStoppen() {
    anfrageNummer++;

    if (pegelAnimation !== null) {
        cancelAnimationFrame(pegelAnimation);
        pegelAnimation = null;
    }

    if (audioKontext) {
        audioKontext.close().catch(() => { });
        audioKontext = null;
    }

    if (medienStream) {
        medienStream.getTracks().forEach(track => {
            track.stop();
        });

        medienStream = null;
    }

    kamera.pause();
    kamera.srcObject = null;
    kameraGeist.pause();
    kameraGeist.srcObject = null;
    kameraRahmen.hidden = true;
    kamera.hidden = true;

    mikrofonPegel.value = 0;
    medienStart.disabled = false;
    medienStart.textContent = "Kamera und Mikrofon starten";
    medienStatus.textContent =
        "Kamera und Mikrofon sind ausgeschaltet.";
}

medienStart.addEventListener("click", async () => {
    medienStoppen();

    const meineAnfrage = anfrageNummer;

    medienStart.disabled = true;
    medienStatus.textContent = "Warte auf Browserfreigabe ...";

    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: {
                echoCancellation: true,
                noiseSuppression: true
            }
        });

        if (
            meineAnfrage !== anfrageNummer ||
            aktiverBereich !== "wahnsinn" ||
            wahnsinnExperiment.hidden
        ) {
            stream.getTracks().forEach(track => track.stop());
            return;
        }

        medienStream = stream;

        kamera.srcObject = stream;
        kameraGeist.srcObject = stream;

        kameraRahmen.hidden = false;
        kamera.hidden = false;

        await Promise.all([
            kamera.play(),
            kameraGeist.play()
        ]);

        audioKontext = new AudioContext();
        audioKontext.resume().catch(() => { });

        const quelle =
            audioKontext.createMediaStreamSource(stream);

        const analyser = audioKontext.createAnalyser();
        analyser.fftSize = 1024;

        quelle.connect(analyser);

        const tiefpass = audioKontext.createBiquadFilter();
        tiefpass.type = "lowpass";
        tiefpass.frequency.value = 1300;

        const direkt = audioKontext.createGain();
        direkt.gain.value = 0.20;

        const verzoegerung = audioKontext.createDelay(1);
        verzoegerung.delayTime.value = 0.25;

        const echo = audioKontext.createGain();
        echo.gain.value = 0.10;

        const limiter = audioKontext.createDynamicsCompressor();
        limiter.threshold.value = -24;
        limiter.ratio.value = 12;

        quelle.connect(tiefpass);

        tiefpass.connect(direkt);
        direkt.connect(limiter);

        tiefpass.connect(verzoegerung);
        verzoegerung.connect(echo);
        echo.connect(limiter);

        limiter.connect(audioKontext.destination);

        const modus = kamera.dataset.effekt || "alkohol";

        if (modus === "lsd" || modus === "pilze") {

            tiefpass.frequency.value =
                modus === "lsd" ? 2400 : 900;

            direkt.gain.value =
                modus === "lsd" ? 0.12 : 0.08;

            echo.gain.value = 0.06;

            const echoStufen = modus === "lsd"
                ? [
                    [0.43, 0.12, 0.25],
                    [0.97, 0.09, 0.28],
                    [1.75, 0.065, 0.30],
                    [3.10, 0.045, 0.32]
                ]
                : [
                    [0.85, 0.13, 0.22],
                    [1.65, 0.09, 0.26],
                    [2.90, 0.07, 0.30]
                ];

            for (const [zeit, lautstaerke, feedback] of echoStufen) {

                const delay = audioKontext.createDelay(5);
                delay.delayTime.value = zeit;

                const volumen = audioKontext.createGain();
                volumen.gain.value = lautstaerke;

                const rueckkopplung = audioKontext.createGain();
                rueckkopplung.gain.value = feedback;

                tiefpass.connect(delay);

                delay.connect(volumen);
                volumen.connect(limiter);

                delay.connect(rueckkopplung);
                rueckkopplung.connect(delay);
            }
        }


        const daten = new Uint8Array(analyser.fftSize);

        function pegelMessen() {
            if (medienStream !== stream) {
                return;
            }

            analyser.getByteTimeDomainData(daten);

            let summe = 0;

            for (const wert of daten) {
                const sample = (wert - 128) / 128;
                summe += sample * sample;
            }

            const pegel = Math.sqrt(summe / daten.length);

            mikrofonPegel.value =
                Math.min(100, Math.round(pegel * 400));

            pegelAnimation = requestAnimationFrame(pegelMessen);
        }

        pegelMessen();

        medienStatus.textContent =
            "Kamera und Mikrofon sind aktiv.";

        medienStart.disabled = false;
        medienStart.textContent = "Neu starten";

    } catch (fehler) {
        if (meineAnfrage !== anfrageNummer) {
            return;
        }

        medienStoppen();

        medienStatus.textContent =
            "Kamera oder Mikrofon nicht verfügbar: " +
            fehler.message;
    }
});

window.addEventListener("pagehide", medienStoppen);

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        medienStoppen();
    }
});

bereichWechseln("start");
