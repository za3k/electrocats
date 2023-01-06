function interpolate(x1, x2, p) { return x1 + (x2-x1)*p; }
function HzToFreq(hz) {
    return Math.sqrt(hz * 100 / 8 / 44100 - 0.001);
}
function catNoise(num, size) {
    console.log(num, size)
    const cats = [ 36.6666, 41.15625, 46.40625, 55, 61.875, ];
    const freq = HzToFreq(cats[num]*Math.pow(2, 4-size));
    return { 
        "p_base_freq": freq, /* Important one */
        "oldParams": true, "wave_type": 0, "p_env_attack": 0.038221891177618914, "p_env_sustain": 0.34444929403935354, "p_env_punch": 0, "p_env_decay": 0.15446753444435568, "p_freq_limit": 0, "p_freq_ramp": 0.13907267033389292, "p_freq_dramp": 0.04108379023306889, "p_vib_strength": -0.008513789465370333, "p_vib_speed": -0.025172196644578045, "p_arp_mod": 0.10353989549267754, "p_arp_speed": -0.00976995388595972, "p_duty": 0.5189726993009689, "p_duty_ramp": -0.00045180553612936963, "p_repeat_speed": 0, "p_pha_offset": -0.023792329985701008, "p_pha_ramp": -0.016048098290179967, "p_lpf_freq": 1.0535216252490764, "p_lpf_ramp": 0.005303800152251403, "p_lpf_resonance": 0.021555109397537145, "p_hpf_freq": 0.11612266759249558, "p_hpf_ramp": 0, "sound_vol": 0.25, "sample_rate": 44100, "sample_size": 8, "p_vib_delay": null }
}

const CATS = {};
function makeLion(num, size) {
    const l = $(`<div style="width: 200px; min-height: 100px; display: inline-block;" class="noselect" draggable=false><img src="cat.jpg" class="clickable" draggable=false></div>`);
    const cat = l.find("img");
    cat.data("note", num);
    cat.data("size", size);
    const height = Math.floor(Math.pow(1.4, 2+size)*20);
    cat.css("height", height);
    l.css("min-height", height+20);
    l.css("text-align", "center");
    cat.css("display", "inline-block");
    cat.css("margin", "auto");

    l.on("mousedown", () => activate(cat));
    cat.on("mouseover", () => activate(cat));
    CATS[size] ||= {};
    CATS[size][num] = cat;

    return l;
}

function main() {
    for (let size=0; size<4; size++) {
        const d = $("<div></div>");
        for (let i=0; i<5; i++) {
            d.append(makeLion(i, size));
        }
        $(".game").append(d);
    }
}

function randomCat(size) {
    const i = Math.floor(Math.random()*5);
    return CATS[size][i];
}
function activate(cat) {
    roar(cat);
    // Activate more cats
    const size = cat.data("size");
    if (size <= 0) return;
    setTimeout(() => {
        roar(randomCat(size-1))
        activate(randomCat(size-1));
    }, 1000);
}

function roar(cat) {
    cat.addClass("singing");
    const a = sfxr.toAudio(catNoise(cat.data("note"), cat.data("size")))
    a.play();
    setTimeout(() => cat.removeClass("singing"), 500);
}

$(document).ready(main);
