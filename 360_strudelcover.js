/*
360 (KAIXI cover & remix)
Brat and it's the same but we're live-coding so it's not
*/

// this song is 120bpm, in 4/4 time
// 1 beat = 1 quarter note
// 4 quarter notes = 1 measure = 1 "cycle"
// 120 quarter notes per minute = 120/4 cycles per min
let cpm = 120/4;

samples({
  camera_flash: '360_camera_flash.wav',
  vox: '360_vocals.wav'
}, 'https://raw.githubusercontent.com/kai-xi/360/main/samples/');

// play a sound
// sound("gm_synth_bass_2:2");

// arrange notes and modify a sound
// let lead_synth = note(
//   "<[b3 - c4 -] [e3 - f3 c4] [- c4 a4 -] [- - - -]>*4"
// )
//   .sound("gm_synth_bass_2:2")
//   .release(.3).lpf(1500).lpenv(1);

// or design a sound from more basic waveforms
let lead_synth = arrange(
  [3, "<[[e3,b3] - c4 -] [e3 - f3 c4] [- c4 a4 -] [- - - -]>*4"],
  [1, "<[- - [g3,b3] -] [g3 - a3 c4] [- c4 c5 -] [c4 - g4 -]>*4"]
)
  .note().sound("sawtooth")
  // amplitude envelope
  .attack(.0).decay(.25).sustain(0).release(.3)
  // filter envelope
  .lpf(300).lpq(0).lpenv(3).lpa(0).lpd(.15).lps(0)
  // add delay for an echo effect
  .delay(.2).delaytime(.25).delayfeedback(.1);

// arrange(
//   [4, lead_synth]
// ).cpm(cpm);

let section_1 = stack(lead_synth);

// section 2
let bass = arrange(
  [2, "<[e2 -] [- - e2 f2] [- f1] [-]>*4"],
  [1, "<[- e2] [e2 - e2 f2] [- f1] [-]>*4"],
  [1, "<[g2 -] [g2 - g2 a2] [-] [-]>*4"],
)
  .note().sound("gm_synth_bass_2:0")
  .attack(0).decay(.5).release(.3)
  .lpf(1800);

let sub_bass = bass.transpose(-12);

let bass_drum = arrange(
  [2, "<[bd -] [- - bd bd] [- bd] [-]>*4"],
  [1, "<[- bd] [bd - bd bd] [- bd] [-]>*4"],
  [1, "<[bd -] [bd - bd bd] [-] [-]>*4"],
)
  .sound().bank("RolandTR808").gain(1.5);

let clap = arrange(
  [4, "<[-] [cp] [-] [cp]>*4"]
)
  .sound().bank("RolandTR808").gain(1.15);

let drums = stack(bass_drum, clap);
 
let section_2 = stack(lead_synth, bass, sub_bass, drums);

// section 3
let lead_saw = arrange(
  [4, "<[g4 - g4 g4] [g4 g4@2 g4] [g4 g4 g4@2] [g4@2 g4 g4]>*4"]
)
  .note().sound("gm_lead_2_sawtooth:0")
  .attack(0).decay(.3).sustain(0).release(.15)
  .lpf(3000).lpenv(10).lpa(0).lpd(.25).lps(0).lpr(0)
  .gain(.2);

// let section_3 = stack(lead_synth, bass, drums, lead_saw);

// adding camera flash sound effect
let camera_flash = s("<[- [- camera_flash] - -] [-]>/4");
let section_3 = stack(
  lead_synth, 
  bass,
  sub_bass,
  drums.mask("<[1 [1 0] 1 1] [1 1 1 [1 0]]>/4"),
  lead_saw.mask("<1 [1 1 1 [1 0]]>/4"),
  camera_flash
);

let section_4 = stack(
  lead_synth, 
  bass.lpf("<20000 [20000 20000 20000 500]>/4"), 
  sub_bass.lpf("<20000 [20000 20000 20000 500]>/4"), 
  drums.mask("<1 [1 1 1 [1 0]]>/4")
);

// section 5
let bass_modified = arrange(
  [1, "<[e2 -] [- - e2 f2] [- f1] [-]>*4"],
  [1, "<[e2 -] [- - e2 f2] [- f1] [e2 e2 e2 -]>*4"],
  [1, "<[e2 e2] [- - e2 f2] [- f1] [-]>*4"],
  [1, "<[g2 -] [g2 - g2 a2] [-] [-]>*4"],
)
  .note().sound("gm_synth_bass_2:0")
  .attack(0).decay(.5).release(.3)
  .lpf(1800);

let sub_bass_modified = bass_modified.transpose(-12);

let bass_drum_modified = arrange(
  [1, "<[bd -] [- - bd bd] [- bd] [-]>*4"],
  [1, "<[bd -] [- - bd bd] [- bd] [bd bd bd -]>*4"],
  [1, "<[bd bd] [- - bd bd] [- bd] [-]>*4"],
  [1, "<[bd -] [bd - bd bd] [-] [-]>*4"],
)
  .sound().bank("RolandTR808").gain(1.5);

let section_5 = stack(
  lead_synth, 
  bass_modified,
  sub_bass_modified,
  bass_drum_modified,
  clap.mask("<1 [1 1 1 [1 0]]>/4"),
  lead_saw.mask("<[1 1 1 [1 0]]>/4")
);

let instrumental = arrange(
  [4, section_1],
  [8, section_2],
  [8, section_3],
  [8, section_4],
  [4, section_5]
).cpm(cpm);

// slicing the vocals just so it stops playing after each line
let vocals = s("vox")
  .slice(32, 
         "<0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31>");

// stack(instrumental, vocals);


// // WORKING IT OUT ON THE REMIX

// // bumping that
// let vox_chop_1 = s("vox").slice(32, "<30 30 30 30>");
// // ah-ah ah-ah-ah
// let vox_chop_2 = 
//   // s("vox").slice(32, "<- - - 27>");
//     s("<- - - vox>").begin((27*4 + 1)/(32 *4)).end("0.89").late(1/4).gain(.8);

// let remix_vox = arrange(
//   [4, stack(vox_chop_1.mask("<1 1 1 1 1 1 1 0>"), vox_chop_2.mask("<0 1>/4"))]
// );

// let section_5_ext = stack(
//   lead_synth, 
//   bass_modified,
//   sub_bass_modified,
//   bass_drum_modified,
//   clap.mask("<1 [1 1 1 [1 0]]>/4"),
//   lead_saw.mask("<1 [1 1 1 [1 0]]>/4")
// );

// let hihats = arrange(
//   [4, "<[hh - hh hh] [hh hh@2 hh] [hh hh hh@2] [hh@2 hh hh]>*4"]
// )
//   .sound().bank("RolandTR808").gain(.8);

// let section_6 = stack(
//   bass_modified, 
//   sub_bass_modified, 
//   bass_drum_modified,
//   clap.mask("<1 [1 1 1 [1 0]]>/4"),
//   hihats.mask("<1 [1 1 1 [1 0]]>/4")
// );

// let bass_modified_2 = arrange(
//   [1, "<[e2 -] [- - e2 f2] [- - f1 -] [-]>*4"],
//   [1, "<[e2 -] [- - e2 f2] [- - f1 -] [e2 e2 e2 -]>*4"],
//   [1, "<[e2 e2] [- - e2 f2] [- - f1 - ] [-]>*4"],
//   [1, "<[g2 -] [g2 - g2 a2] [-] [-]>*4"],
// ).transpose(24)
//   .note().sound("gm_fx_brightness:4")
//   .attack(0).decay(.5).release(.3)
//   .lpf(8000).lpa(0).lpd(.08).lpq(10);

// let bass_modified_3 = arrange(
//   [1, "<[e2 -] [- - e2 f2] [- f1] [-]>*4"],
//   [1, "<[e2 -] [- - e2 f2] [- f1] [e2 e2 e2 -]>*4"],
//   [1, "<[e2 e2] [- - e2 f2] [- f1] [-]>*4"],
//   [1, "<[g2 -] [g2 - g2 a2] [-] [-]>*4"],
// ).transpose(24)
//   .note().sound("gm_lead_2_sawtooth:0")
//   .attack(0).decay(.4).release(.3)
//   .lpf(500).lpa(0).lpd(.03).lpq(0);

// let section_7 = stack(
//   bass_modified_2,
//   sub_bass_modified,
//   clap.mask("<1 [1 1 1 [1 0]]>/4")
// );

// let section_8 = stack(
//   bass_modified_3.lpf("<500 600 700 [[800 [1000 1200]] 1200]>"),
//   sub_bass_modified,
//   clap.mask("<1 [1 1 1 [1 0]]>/4")
// );

// // down
// let vox_chop_3 = s("vox").slice(32 * 4, "<- 50 - 50 - 50 - 50>*4");
// // bumping that beat
// let vox_chop_4 = s("vox").slice(32 * 4, "<- - - - 99 100 99 100>*4");
// // i'm everwhere, i'm so julia
// let vox_chop_5 = s("vox").slice(32 * 4, "<- - - - 89 90 91 92>*4");
// // 360
// let vox_chop_6 = s("<vox - - ->*4").begin(79 / (32 * 4)).end((0.630)).gain(.5);

// arrange(
//   [4, section_1],
//   [8, stack(section_5_ext, remix_vox.lpf("<1500 1500 1500 1500 1500 1500 1500 2000>"))],
//   [8, stack(section_6)],
//   [4, stack(section_7)],
//   [4, stack(section_8, vox_chop_6.lpf("<600 1000 1350 0>").mask("<1 1 1 0>"))],
//   [8, stack(
//     section_5, 
//     vox_chop_3.mask("<[1 0] [1 0] [1 0] [1 0]>/2"), 
//     vox_chop_4.mask("<[0 1] [0 1] [0 1] [0 0]>/2"), 
//     vox_chop_5.lpf(1500).lpa(.25).lpd(.25).pan(sine).mask("<[0 0] [0 0] [0 0] [0 1]>/2"), 
//     vox_chop_2.mask("<0 1>/4"),
//     hihats.mask("<1 [1 1 1 [1 0]]>/4")
//   )],
//   [8, stack(section_5, remix_vox.mask("<1 1 1 0 1 1 1 1>"))],
//   [4, vox_chop_1.delay(.25).delayt(.5).dfb(.2).mask("<1 0 0 0>")]
// );