function catNoise(size) {
    return { 
        "p_base_freq": 0.422, /* Important one */
        "oldParams": true, "wave_type": 0, "p_env_attack": 0.038221891177618914, "p_env_sustain": 0.34444929403935354, "p_env_punch": 0, "p_env_decay": 0.15446753444435568, "p_freq_limit": 0, "p_freq_ramp": 0.13907267033389292, "p_freq_dramp": 0.04108379023306889, "p_vib_strength": -0.008513789465370333, "p_vib_speed": -0.025172196644578045, "p_arp_mod": 0.10353989549267754, "p_arp_speed": -0.00976995388595972, "p_duty": 0.5189726993009689, "p_duty_ramp": -0.00045180553612936963, "p_repeat_speed": 0, "p_pha_offset": -0.023792329985701008, "p_pha_ramp": -0.016048098290179967, "p_lpf_freq": 1.0535216252490764, "p_lpf_ramp": 0.005303800152251403, "p_lpf_resonance": 0.021555109397537145, "p_hpf_freq": 0.11612266759249558, "p_hpf_ramp": 0, "sound_vol": 0.25, "sample_rate": 44100, "sample_size": 8, "p_vib_delay": null }
}

function makeLion(size) {
    const l = $(`<img src="cat.jpg" class="clickable">`);
    l.css("height", Math.floor(Math.pow(2, size)*40));
    l.on("mousedown", () => roar(l, size));
    return l;
}

function main() {
    for (let size=0; size<4; size++) {
        const d = $("<div></div>");
        for (let i=0; i<Math.pow(2, 4-size); i++) {
            d.append(makeLion(size));
        }
        $(".game").append(d);
    }
}

function roar(e, size) {
    const a = sfxr.toAudio(catNoise(size))
    a.play();
}

$(document).ready(main);
