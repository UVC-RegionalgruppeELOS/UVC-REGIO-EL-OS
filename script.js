/* =========================================================
   UVC Regionalgruppe Emsland–Osnabrück – Zentrale Funktionen
   ========================================================= */

function toggleMenu() {
    const nav = document.getElementById("mainNav");
    if (nav) {
        nav.classList.toggle("active");
    }
}

function openLightbox(imageSrc) {
    let lightbox = document.getElementById("collageLightbox");

    if (!lightbox) {
        lightbox = document.createElement("div");
        lightbox.id = "collageLightbox";
        lightbox.className = "lightbox";
        lightbox.onclick = closeLightbox;

        const closeBtn = document.createElement("span");
        closeBtn.className = "lightbox-close";
        closeBtn.innerHTML = "&times;";
        closeBtn.onclick = closeLightbox;

        const img = document.createElement("img");
        img.id = "lightboxImage";
        img.alt = "Vergrößerte Ansicht";
        img.onclick = function (event) {
            event.stopPropagation();
        };

        lightbox.appendChild(closeBtn);
        lightbox.appendChild(img);
        document.body.appendChild(lightbox);
    }

    const lightboxImg = document.getElementById("lightboxImage");
    lightboxImg.src = imageSrc;
    lightbox.classList.add("active");
}

function closeLightbox() {
    const lightbox = document.getElementById("collageLightbox");
    if (lightbox) {
        lightbox.classList.remove("active");
    }
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeLightbox();
    }
});

/* =========================================================
   Bildlaufleisten & Vollbild-Präsentation
   ========================================================= */

function toggleMarqueeFullscreen(marqueeId) {
    const el = document.getElementById(marqueeId);
    if (!el) return;

    if (!document.fullscreenElement) {
        if (el.requestFullscreen) {
            el.requestFullscreen();
        } else if (el.webkitRequestFullscreen) {
            el.webkitRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

function toggleMarqueePause(trackId, btn, event) {
    if (event) event.stopPropagation();
    const track = document.getElementById(trackId);
    if (!track) return;

    const anims = track.getAnimations();
    const isPaused = track.dataset.paused === "true";

    if (!isPaused) {
        anims.forEach(function (anim) {
            anim.pause();
        });
        track.dataset.paused = "true";
        if (btn) btn.textContent = "▶ Weiterlaufen";
    } else {
        anims.forEach(function (anim) {
            anim.play();
        });
        track.dataset.paused = "false";
        if (btn) btn.textContent = "⏸ Pause";
    }
}

function stepMarquee(trackId, event) {
    if (event) event.stopPropagation();
    const track = document.getElementById(trackId);
    if (!track) return;

    const anims = track.getAnimations();
    const firstItem = track.querySelector(".marquee-item");
    if (!anims.length || !firstItem) return;

    const halfWidth = track.scrollWidth / 2;
    const itemWidth = firstItem.offsetWidth + 20;
    if (halfWidth <= 0) return;

    anims.forEach(function (anim) {
        const timing = anim.effect.getComputedTiming();
        const duration = timing.duration;
        if (!duration || duration === Infinity) return;

        const stepTime = (itemWidth / halfWidth) * duration;
        anim.currentTime = (anim.currentTime || 0) + stepTime;
    });
}

function shuffleImages(array) {
    const copy = array.slice();
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function buildSeamlessMarquee(trackId, imageList) {
    const track = document.getElementById(trackId);
    if (!track) return;

    const shuffled = shuffleImages(imageList);
    const doubled = shuffled.concat(shuffled);

    doubled.forEach(function (item) {
        const figure = document.createElement("div");
        figure.className = "marquee-item";

        const img = document.createElement("img");
        img.src = item.src;
        img.alt = item.text;

        const caption = document.createElement("div");
        caption.className = "marquee-caption";
        caption.textContent = item.text;

        figure.appendChild(img);
        figure.appendChild(caption);
        track.appendChild(figure);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const unimogImages = [
        { src: "1951.jpg", text: "Unimog 2010 „Dieseli“ · 1951" },
        { src: "1956.jpg", text: "Unimog · 1956" },
        { src: "1957.png", text: "Unimog 411.110 · 1957" },
        { src: "unimog-1958-nils.png", text: "Unimog · 1958" },
        { src: "unimog-1961-nils.png", text: "Unimog · 1961" },
        { src: "1975.png", text: "Unimog · 1975" },
        { src: "1979.jpg", text: "Unimog · 1979" },
        { src: "unimog-1979-2.jpg", text: "Unimog · 1979" },
        { src: "1986.jpg", text: "Unimog · 1986" },
        { src: "ABG 1 Reinhold.jpg", text: "Anbaugerät · Frontdrücker (Reinhold)" },
        { src: "ABG 2 Reinhold.jpg", text: "Anbaugerät · Schlegelmulcher (Michael)" },
        { src: "ABG 3 Reinhold.jpg", text: "Anbaugerät · Forstseilwinde (Reinhold)" },
        { src: "ABG 4 Häcksler mit Anhänger Michael.jpg", text: "Anbaugerät · Feldhäcksler Speiser Scampolo (Michael)" },
        { src: "ABG 5 Kreissäge Familie Garner.jpg", text: "Anbaugerät · Kreissäge (Familie Garner)" },
        { src: "ABG 6 Mähbalken Michael.jpeg", text: "Anbaugerät · Mähbalken (Michael)" },
        { src: "ABG 7 Sähmaschine Michael.jpeg", text: "Anbaugerät · Sähmaschine / Drillmaschine (Michael)" },
        { src: "ABG 8 Industrie-Frontlader Michael.jpg", text: "Anbaugerät · Industrie-Frontlader (Michael)" },
        { src: "2023.jpg", text: "Treffen Bad Laer · 2023" },
        { src: "2024.jpg", text: "Treffen Bad Laer · 2024" },
        { src: "2025.jpg", text: "Treffen Baccum · 2025" },
        { src: "2026.jpeg", text: "Treffen Versmold-Loxten · 2026" },
        { src: "gruendung.png", text: "Gründung Regionalgruppe · 2026" },
        { src: "Nordhorn1.jpg", text: "Feldtage Nordhorn · 2022" },
        { src: "Nordhorn2.jpg", text: "Feldtage Nordhorn · 2022" },
        { src: "Nordhorn3.jpg", text: "Feldtage Nordhorn · 2022" },
        { src: "Nordhorn4.jpg", text: "Feldtage Nordhorn · 2022" },
        { src: "Nordhorn5.jpg", text: "Feldtage Nordhorn · 2022" },
        { src: "Nordhorn6.jpg", text: "Feldtage Nordhorn · 2022" },
        { src: "Nordhorn7.jpg", text: "Feldtage Nordhorn · 2022" },
        { src: "Nordhorn8.jpg", text: "Feldtage Nordhorn · 2022" },
        { src: "Verl1.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl2.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl3.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl4.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl5.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl6.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl7.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl8.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl9.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl10.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl11.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl12.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl13.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl14.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl15.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl16.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl17.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl18.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl19.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl20.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl21.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl22.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl24.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl25.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl26.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl27.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl28.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl29.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl30.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl30a.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl31.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl32.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl33.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl34.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl35.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl36.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl37.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl38.jpg", text: "Treffen Verl · 2026" }
    ];

    const museumImages = [
        { src: "OB33.png", text: "Deutsche Bundesbahn · OB33 · 1930er" },
        { src: "RhAp.png", text: "Deutsche Reichspost · RhAp · 1940er–1960er" },
        { src: "FeTAp W28-38 angeschlossen.png", text: "Wählapparat · W28/38 · 1950er" },
        { src: "Ftf50.png", text: "Albiswerk Zürich · Feldtelefon Ftf50 · 1950er–1960er" },
        { src: "FeTAp W48 angeschlossen.png", text: "Wählapparat · W48 · 1955" },
        { src: "DDR-W58.png", text: "VEB Fernmeldewerk Nordhausen · W58 · 1962" },
        { src: "DDR IFW W.png", text: "VEB Apparatebau Caputh · IFW/W · 1970er" },
        { src: "FeTAp 611-2 von 05-1971.png", text: "Deutsche Bundespost · FeTAp 611-2 · 1971" },
        { src: "FeTAp Te100 von 11-1972.png", text: "Deutsche Bundespost · FeTAp Te100 · 1972" },
        { src: "FeTAp 612 von 1977.png", text: "Deutsche Bundespost · FeTAp 612 · 1977" },
        { src: "FeTAp 611-1a von 11-1979.png", text: "Deutsche Bundespost · FeTAp 611-1a · 1979" },
        { src: "FeTAp Masterset 80er Jahre.png", text: "FeTAp · Masterset · 1980er" },
        { src: "FeTAp 612-2a angeschlossen.png", text: "Deutsche Bundespost · FeTAp 612-21 · 1982" },
        { src: "FeTAp 791-1 von 12-1986.png", text: "Deutsche Bundespost · FeTAp 791-1 · 1986" },
        { src: "FeTAp BW Modell 54 OB-ZB angeschlossen.png", text: "Bundeswehr · Feldfernsprecher 54 OB/ZB · 1988" },
        { src: "FeTAp 795-1 von 10-1988.png", text: "Deutsche Bundespost · FeTAp 795-1 · 1988" },
        { src: "FeTAp Tel 0164 von 06-1989.png", text: "Deutsche Bundespost · Tel 0164 · 1989" },
        { src: "FeTAp 2L-752-1 von 08-1989.png", text: "Deutsche Bundespost · FeTAp 2L-752-1 · 1989" },
        { src: "FeTAp Tel 0164 LXvon 02-1991.png", text: "Telekom · Tel 0164 LX · 1991" },
        { src: "FeTAp SEL1026 von 10-1991.png", text: "SEL · FeTAp SEL1026 · 1991" },
        { src: "TL 7 Daimon 414..png", text: "Daimon · 314 (Bundeswehr) · 1950er" },
        { src: "TL 2 VARTA 505.png", text: "VARTA · TL 2 (505) · 1950er" },
        { src: "TL 9 DAIMON FOCUS.jpg", text: "Daimon · Focus · 1950er" },
        { src: "TL 8 VARTA 616.jpg", text: "VARTA · Spot-Light 616 · 1958–1965" },
        { src: "TL 4 VARTA 618.png", text: "VARTA · TL 4 (618) · 1960er" },
        { src: "TL 11 DAIMON.jpg", text: "Daimon · Handlampe · 1960er" },
        { src: "TL 3 VARTA 657.png", text: "VARTA · TL 3 (657) · 1970er" },
        { src: "TL 5 VARTA 658.png", text: "VARTA · TL 5 (658) · 1970er" },
        { src: "TL 6 VARTA Duplex.png", text: "VARTA · TL 6 Duplex (430) · 1970er" },
        { src: "TL 12 VARTA 670.jpg", text: "VARTA · 670 · 1970er" },
        { src: "TL 13 VARTA 615.jpg", text: "VARTA · 615 · 1970er" },
        { src: "TL 14 VARTA.jpg", text: "VARTA · Handlampe · 1970er" },
        { src: "TL 15 VARTA.jpg", text: "VARTA · Taschenlampe · 1970er" },
        { src: "TL 16 VARTA.jpg", text: "VARTA · Taschenlampe · 1970er" },
        { src: "TL 17 VARTA.jpg", text: "VARTA · Taschenlampe · 1970er" },
        { src: "TL 18.jpg", text: "Unbekannt · Handlampe · 1970er" },
        { src: "HL CEAG Dortmund.jpg", text: "CEAG Dortmund · Sicherheitslampen · 1970er–1990er" },
        { src: "TL1 Maglite Mini.png", text: "Maglite · Mini AA · ab 1984" },
        { src: "HL 1 Makita.png", text: "Makita · ML120 (12 V) · 1990er" },
        { src: "TL 19 WONDER BABET.jpg", text: "Wonder · Babet · 1990er" },
        { src: "HL Acculux SL6 LED.jpg", text: "Acculux · SL6 LED · ca. 2005–2010" },
        { src: "LmK Tischlampe 2.jpg", text: "Zierliche Vintage-Tischlampe · ca. 1950er" },
        { src: "LmK Deckenlampe.jpg", text: "Deckenlampe mit Glasschirm · ca. 1950er–1960er" },
        { src: "LmK Nachttischlampe.jpg", text: "Nachttischlampe mit Strukturglas · ca. 1960er" },
        { src: "LmK Tischlampe.jpg", text: "Tischlampe mit Holzfuß · ca. 1960er–1970er" },
        { src: "LmK Wagenradnabe.jpg", text: "Tischlampe aus Wagenradnabe · ca. 1960er–1970er" },
        { src: "LmK Kronleuchter.jpg", text: "Mehrflammiger Kronleuchter · ca. 1970er" },
        { src: "LmK Lampe 1.jpg", text: "Türkisblaue Retro-Tischleuchte · 1970er" },
        { src: "LmK Reiselampe.jpg", text: "Klappbare Reiselampe · ca. 1970er–1980er" },
        { src: "Uhr Taschenuhr 1.jpg", text: "Taschenuhr · Handaufzug · ca. 1930er" },
        { src: "Uhr Taschenuhr 2.jpg", text: "Taschenuhr · Handaufzug · ca. 1930er" },
        { src: "Uhr Armbanduhr 1.jpg", text: "Armbanduhr · Mechanisch · 1940er" },
        { src: "Uhr Armbanduhr 2.jpg", text: "Armbanduhr · Mechanisch · 1940er" },
        { src: "Uhr Armbanduhr 3.jpg", text: "Armbanduhr · Mechanisch · 1940er" },
        { src: "Uhr Armbanduhr 4.jpg", text: "Armbanduhr · Mechanisch · 1940er" },
        { src: "Uhr Reisewecker 1.jpg", text: "Reisewecker · Klappgehäuse · 1950er" },
        { src: "Uhr Reisewecker 2.jpg", text: "Reisewecker · Klappgehäuse · 1950er" },
        { src: "Uhr Reisewecker 3.jpg", text: "Reisewecker · Klappgehäuse · 1950er" },
        { src: "Uhr Kurzzeitmesser 1.jpg", text: "Kurzzeitmesser · Federwerk · 1960er" },
        { src: "Uhr Kurzzeitmesser 2.jpg", text: "Kurzzeitmesser · Federwerk · 1960er" },
        { src: "Uhr Mutteruhr.jpg", text: "Mutteruhr · Hauptuhr · 1970er" },
        { src: "Uhr Tochter PEWETA.jpg", text: "PEWETA · Tochteruhr · 1970er" },
        { src: "Uhr Tochter SIEMENS.jpg", text: "SIEMENS · Tochteruhr · 1970er" },
        { src: "Uhr Tochter TN.jpg", text: "Telefonbau & Normalzeit · Tochteruhr · 1970er" },
        { src: "Uhr Wanduhr.jpg", text: "Wanduhr · Quarzwerk · 1980er" },
        { src: "Uhr Schrankuhr 1.jpg", text: "Schrankuhr · Pendelwerk · 1980er" },
        { src: "Uhr Standuhr.jpg", text: "Standuhr · Pendel-Schlagwerk · 1990er" },
        { src: "VHS alt.jpg", text: "Eisen-Vorhängeschloss · Genietet · ca. 1920–1930" },
        { src: "VHS rund.jpg", text: "Rund-Vorhängeschloss · Stahl · ca. 1950–1960" },
        { src: "VHS Burg.jpg", text: "BURG-Wächter · Vorhängeschloss · ca. 1960–1970" },
        { src: "VHS Abus 465-60.jpg", text: "ABUS · Modell 465-60 · ca. 1960er" },
        { src: "VHS Abus rot.jpg", text: "ABUS · Vorhängeschloss rot · ca. 1970er" },
        { src: "VHS Goldfarbend.jpg", text: "Messing-Minischloss · Zylinder · ca. 1980er" },
        { src: "AB 1.jpg", text: "Keramikaschenbecher · 1950er" },
        { src: "AB 2.jpg", text: "Schwarzer Glasaschenbecher · 1960er" },
        { src: "AB 3.jpg", text: "Metallaschenbecher emailliert · 1950–1960" },
        { src: "AB 4.jpg", text: "Glasaschenbecher · Vogelpark Bad Rothenfelde · 1970er" },
        { src: "AB 5.jpg", text: "Dreieckiger Glasaschenbecher · 1960er" },
        { src: "AB 6.jpg", text: "Quadratischer Glasaschenbecher · 1950–1960" },
        { src: "AB 7.jpg", text: "Glasaschenbecher mit Metallhalterung · 1960er" },
        { src: "Büro Schreibmaschine.jpg", text: "Mechanische Schreibmaschine · 1950er" },
        { src: "Büro Hefter.jpg", text: "Skrebba · Mechanischer Hefter · 1950–1960" },
        { src: "Büro Aschenbecher.jpg", text: "Büro-Aschenbecher aus Alabaster · 1950er" },
        { src: "Büro Füller.jpg", text: "Tropen · Füllfederhalter „Gold“ · 1960er" },
        { src: "Büro Box.jpg", text: "Büro-Ablagebox · 1970er" },
        { src: "Büro Pelikan.jpg", text: "Pelikan · Schreibwaren-Etui · 1970er" },
        { src: "Büro 100 Kugelschreiber.jpg", text: "Kugelschreiber-Sammlung · 20. Jahrhundert" },
        { src: "Büro Taschenrechner.jpg", text: "Casio · Taschenrechner FX-790P · 1985" },
        { src: "Röster.jpg", text: "Kaffeeröster aus Gusseisen · ca. 1900–1920" },
        { src: "Bohnenschneider 3.jpg", text: "Pe De · Bohnenschneider Holz-Metall · ca. 1910–1925" },
        { src: "Zentrifuge.jpg", text: "Alfa Laval · Milchseparator Modell 23 · ca. 1920–1930" },
        { src: "Bohnenschneider1.jpg", text: "Pe De · Bohnenschneider Gussmodell · ca. 1930–1940" },
        { src: "10.jpg", text: "Alexanderwerk · Fleischwolf 10 · ca. 1930–1945" },
        { src: "Dosenmaschine.jpg", text: "Lanico · Dosenverschlussmaschine TR38 · ab 1938" },
        { src: "Brotschneider.jpg", text: "Mechanischer Brotschneider · ca. 1940–1950" },
        { src: "20N.jpg", text: "Alexanderwerk · Fleischwolf 20N · ca. 1940–1955" },
        { src: "Kaffeemühle.jpg", text: "Zassenhaus · Handkaffeemühle · ca. 1950–1960" },
        { src: "Kohlschneider.jpg", text: "Mechanischer Kohlschneider · ca. 1950–1960" },
        { src: "Kartoffelpüree.jpg", text: "Kartoffelpüreegerät · ca. 1950–1960" },
        { src: "Schneebesen.jpg", text: "Schneebesen mit Kurbel · ca. 1950–1960" },
        { src: "ALKA.jpg", text: "ALKA · Kurbelgerät · ca. 1950–1965" },
        { src: "Parmesanmühle.jpg", text: "Schulte · Trommelreibe Modell 820 · ca. 1950–1970" },
        { src: "BME5.jpg", text: "BME5 · Kurbelgerät · ca. 1960–1970" },
        { src: "Alexanderwerk7.jpg", text: "Alexanderwerk · Kurbelgerät 7 · ca. 1960–1970" },
        { src: "WKZ Holzschuh Werkzeug.jpg", text: "Holzschuhmacher-Löffelbohrer · ca. 1890–1920" },
        { src: "WKZ Handbohrer 2.jpg", text: "Schlangen- und Nagelbohrer · ca. 1900–1920" },
        { src: "Rahmensäge und Zugsäge.jpg", text: "Rahmensäge und Zugsäge · ca. 1900–1930" },
        { src: "WKZ Hobel groß.jpg", text: "Große Raubankhobel · ca. 1900–1930" },
        { src: "WKZ Hobel.jpg", text: "Schlicht-, Putz- und Profilhobel · ca. 1910–1935" },
        { src: "WKZ Huf- und Klauenzange.jpg", text: "Huf- und Klauenzange · ca. 1910–1935" },
        { src: "Wkz Kneifzange.jpg", text: "Schmiedeeiserne Kneifzange · ca. 1910–1935" },
        { src: "WKZ Sägeschränkzange.jpg", text: "Sägeschränkzange · ca. 1920–1940" },
        { src: "WKZ Locheisen.jpg", text: "Locheisen-Satz · ca. 1920–1940" },
        { src: "WKZ Handbohrer.jpg", text: "Brustleiern und Handbohrwinde · ca. 1920–1945" },
        { src: "WKZ Blechschere.jpg", text: "Handblechscheren · ca. 1925–1945" },
        { src: "WKZ Endländer.jpg", text: "Engländer und Rollgabelschlüssel · ca. 1925–1950" },
        { src: "WKZ Zangen.jpg", text: "Kombi- und Monierzangen · ca. 1930–1950" },
        { src: "WKZ Schlüssel.jpg", text: "Ring- und Spezialschlüssel · ca. 1930–1955" },
        { src: "WKZ Ölkännchen.jpg", text: "Pump-Ölkännchen · ca. 1935–1955" },
        { src: "WKZ Maulschlüssel.jpg", text: "Doppelmaulschlüssel-Satz · ca. 1935–1960" },
        { src: "WKZ Fettpressen.jpg", text: "Stoß- und Handfettpressen · ca. 1940–1960" }
    ];

    buildSeamlessMarquee("unimogScroll", unimogImages);
    buildSeamlessMarquee("museumScroll", museumImages);
    initInternArea();
});

