import "./style.css";
import { UI } from "@peasy-lib/peasy-ui";
import { Assets } from "@peasy-lib/peasy-assets";
import { Input } from "@peasy-lib/peasy-input";
import marker from "./assets/red-mark.svg";
import pencil from "./assets/pencil.mp3";
import texture from "./assets/papertexture.jpg";
import selectmark from "./assets/mark.wav";
import { Howl } from "howler";

enum suspectStatus {
  unknown,
  eliminated,
  possible,
}

const mark = new Howl({
  src: pencil,
  volume: 0.25,
});

const selectsound = new Howl({
  src: selectmark,
  volume: 0.25,
});

const model = {
  playsound: () => {
    mark.play();
  },
  accuse: (event: PointerEvent, model: any, element: HTMLElement) => {
    selectsound.play();
    const myType = element.getAttribute("data-type");
    if (myType) resetAll(<"suspect" | "weapon" | "location">myType);
    switch (myType) {
      case "suspect":
        model.suspect.accused = !model.suspect.accused;
        break;
      case "weapon":
        model.w.accused = !model.w.accused;
        break;
      case "location":
        model.l.accused = !model.l.accused;
        break;
    }
  },
  setFlag: (event: any, model: any, element: HTMLElement) => {
    console.log(event, element);
  },
  isJournalVisible: true,
  suspects: <any>[],
  weapons: <any>[],
  locations: <any>[],
};

const template = `<div>

<div class="journal" \${===isJournalVisible}>
<div class="journal_title">Journal: <span>Double-Click on Name/Weapon/Location to mark for accusation</span></div>
<div class="lines"></div>
<ul id="list">
  <li class="header">Suspects:</li>
  <li class="entry" \${suspect<=*suspects}>
  <div class="marker" \${===suspect.accused}></div>
  <div class="flex left">    
    <div  \${dblclick@=>accuse} data-type="suspect">\${suspect.id}</div>
    <div class="flex bumpright">
      <div class="flex"><label for="us\${suspect.$index}">Unkown Status</label>  <input id="us\${suspect.$index}" type="radio" name="\${suspect.id}" \${checked<=>suspect.status.u} \${click@=>playsound} /> </div>
      <div class="flex"><label for="es\${suspect.$index}">Eliminated</label> <input id="es\${suspect.$index}" type="radio" name="\${suspect.id}" \${checked<=>suspect.status.e} \${click@=>playsound}/> </div>
      <div class="flex"><label for="ps\${suspect.$index}">Potential</label> <input id="ps\${suspect.$index}" type="radio" name="\${suspect.id}" \${checked<=>suspect.status.p} \${click@=>playsound}/> </div>
    </div>
  </div>
  </li>
  <li class="header">Weapons:</li>
  <li class="entry" \${w<=*weapons}>
  <div class="marker" \${===w.accused}></div>
  <div class="flex left">
    <div   \${dblclick@=>accuse} data-type="weapon" >\${w.id}</div>
    <div class="flex bumpright">
      <div class="flex"><label for="uw\${w.$index}">Unkown Status</label>  <input id="uw\${w.$index}" type="radio" name="\${w.id}" \${checked<=>w.status.u} \${click@=>playsound}/> </div>
      <div class="flex"><label for="ew\${w.$index}">Eliminated</label> <input id="ew\${w.$index}" type="radio" name="\${w.id}" \${checked<=>w.status.e} \${click@=>playsound}/> </div>
      <div class="flex"><label for="pw\${w.$index}">Potential</label> <input id="pw\${w.$index}" type="radio" name="\${w.id}" \${checked<=>w.status.p} \${click@=>playsound}/> </div>
    </div>
  </div>
  </li>
  <li class="header">Locations:</li>
  <li class="entry" \${l<=*locations}>
  <div class="marker" \${===l.accused}></div>
  <div class="flex left">
    <div   \${dblclick@=>accuse} data-type="location">\${l.id}</div>
    <div class="flex bumpright">
    <div class="flex"><label for="ul\${l.$index}">Unkown Status</label>  <input id="ul\${l.$index}" type="radio" name="\${l.id}" \${checked<=>l.status.u} \${click@=>playsound}/> </div>
    <div class="flex"><label for="el\${l.$index}">Eliminated</label> <input id="el\${l.$index}" type="radio" name="\${l.id}" \${checked<=>l.status.e} \${click@=>playsound}/> </div>
    <div class="flex"><label for="pl\${l.$index}">Potential</label> <input id="pl\${l.$index}" type="radio" name="\${l.id}" \${checked<=>l.status.p} \${click@=>playsound}/> </div>
    </div>
  </div></li>
</ul>
</div>

</div>`;

//<span>    </span>\${suspect.id}

model.suspects.push({ id: "Jannine Singh", accused: false, status: { e: false, u: false, p: false } });
model.suspects.push({ id: "Wendy Harris", accused: false, status: { e: false, u: false, p: false } });
model.suspects.push({ id: "Hannelore Morgan", accused: false, status: { e: false, u: false, p: false } });
model.suspects.push({ id: "Robb Thompson", accused: false, status: { e: false, u: false, p: false } });
model.suspects.push({
  id: "Bernadette Hernandez",

  accused: false,
  status: { e: false, u: false, p: false },
});
model.suspects.push({ id: "Phil Patterson", accused: false, status: { e: false, u: false, p: false } });

model.weapons.push({ id: "Gun", accused: false, status: { e: false, u: false, p: false } });
model.weapons.push({ id: "Knife", accused: false, status: { e: false, u: false, p: false } });
model.weapons.push({ id: "Poison", accused: false, status: { e: false, u: false, p: false } });
model.weapons.push({ id: "Bat", accused: false, status: { e: false, u: false, p: false } });
model.weapons.push({ id: "Bare Hands", accused: false, status: { e: false, u: false, p: false } });
model.weapons.push({ id: "Machete", accused: false, status: { e: false, u: false, p: false } });

model.locations.push({ id: "Master Bedroom", accused: false, status: { e: false, u: false, p: false } });
model.locations.push({ id: "Guest Bedroom", accused: false, status: { e: false, u: false, p: false } });
model.locations.push({ id: "Kitchen", accused: false, status: { e: false, u: false, p: false } });
model.locations.push({ id: "Foyer", accused: false, status: { e: false, u: false, p: false } });
model.locations.push({ id: "Secret Room", accused: false, status: { e: false, u: false, p: false } });
model.locations.push({ id: "Den", accused: false, status: { e: false, u: false, p: false } });
model.locations.push({ id: "Library", accused: false, status: { e: false, u: false, p: false } });
model.locations.push({ id: "Ballroom", accused: false, status: { e: false, u: false, p: false } });
model.locations.push({ id: "Office", accused: false, status: { e: false, u: false, p: false } });
model.locations.push({ id: "Greenhouse", accused: false, status: { e: false, u: false, p: false } });
model.locations.push({ id: "DiningRoom", accused: false, status: { e: false, u: false, p: false } });

Input.map(
  {
    q: { action: "toggleJournal", repeat: false },
  },
  (action: string, doing: boolean) => {
    if (doing) {
      switch (action) {
        case "toggleJournal":
          model.isJournalVisible = !model.isJournalVisible;

          break;
      }
    }
  }
);

UI.create(document.body, template, model);
UI.initialize(100 / 6);

function resetAll(type: "suspect" | "weapon" | "location") {
  switch (type) {
    case "suspect":
      model.suspects.forEach(element => (element.accused = false));
      break;
    case "weapon":
      model.weapons.forEach(element => (element.accused = false));
      break;
    case "location":
      model.locations.forEach(element => (element.accused = false));
      break;
  }
}
