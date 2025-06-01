import { EvenementAdminView, LookupItem, StatutJustificationApp } from '../models/evenement.model';
import { Session } from '../models/session.model';
import { MOCK_SESSION } from './session.mock';

const generateMatricule = (index: number): string => `105822${String(index).padStart(2, '0')}`; 
const firstNames = ["Seydina Mouhammad", "Awa", "Mamadou", "Fatou", "Ousmane", "Aïssatou", "Papa", "Khadija", "Ibrahima", "Ndeye"];
const lastNames = ["Diop", "Fall", "Ndiaye", "Sow", "Cissé", "Ba", "Kane", "Traoré", "Gueye", "Thiam"];

const getRandomName = (): { prenom: string, nom: string } => {
  const prenom = firstNames[Math.floor(Math.random() * firstNames.length)];
  const nom = lastNames[Math.floor(Math.random() * lastNames.length)];
  return { prenom, nom };
};

const getRandomDateForMock = (): string => {
  const day = Math.floor(Math.random() * 5) + 18;
  return `2025-05-${String(day).padStart(2, '0')}`;
};

const getRandomCourse = (): { id: string, libelle: string } => {
  const courses = [
    { id: 'crs001', libelle: 'Développement Web' },
    { id: 'crs002', libelle: 'Algorithmique' },
    { id: 'crs003', libelle: 'Base de Données' },
    { id: 'crs004', libelle: 'Systèmes d\'Exploitation' },
    { id: 'crs005', libelle: 'Anglais Technique' },
  ];
  if (Math.random() < 0.3) return { id: 'crsFLT', libelle: 'FILUTER' };
  return courses[Math.floor(Math.random() * courses.length)];
};

const getRandomClasse = (): string => {
  const classes = ['L3GLRS', 'L2CDSD', 'M1DATA', 'L3INFO', 'M2CYBER'];
  if (Math.random() < 0.5) return 'L3GLRS';
  return classes[Math.floor(Math.random() * classes.length)];
}

export const MOCK_EVENEMENTS: EvenementAdminView[] = [];

for (let i = 1; i <= 25; i++) { 
  const { prenom, nom } = getRandomName();
  const date = getRandomDateForMock();
  let justification: EvenementAdminView['justification'] = undefined;
  const hasJustification = Math.random() > 0.3; 
  let statut: StatutJustificationApp | undefined = undefined;

  if (hasJustification) {
    const randStatus = Math.random();
    if (randStatus < 0.5) statut = 'VALIDEE'; 
    else if (randStatus < 0.8) statut = 'EN_ATTENTE';
    else statut = 'REJETEE'; 

    justification = {
      id: `just${String(i).padStart(3, '0')}`,
      motifSoumis: `Motif ${i}`,
      dateSoumission: date,
      statut: statut as StatutJustificationApp, 
      ...(statut === 'VALIDEE' && { commentaireAdmin: 'Accepté.' }),
      ...(statut === 'REJETEE' && { commentaireAdmin: 'Non conforme.' }),
    };
  } else {
  }


  MOCK_EVENEMENTS.push({
    id: `evt${String(i).padStart(3, '0')}`,
    type: Math.random() > 0.8 ? 'RETARD' : 'ABSENCE', 
    date: date,
    heureDebut: '08H', 
    heureFin: '12H',  
    etudiant: {
      id: `etu${String(i).padStart(3, '0')}`,
      matricule: generateMatricule(i),
      nom: nom,
      prenom: prenom,
      photoUrl: 'assets/images/placeholder-avatar.png', 
      classe: getRandomClasse(),
      niveau: 'Licence 3', 
      filiere: 'Génie Logiciel'
    },
    session: MOCK_SESSION[0],
    justification: justification,
  });
}


export const MOCK_CLASSES: LookupItem[] = [ { id: 'cl01', libelle: 'L3GLRS' }, { id: 'cl02', libelle: 'L2CDSD' }];
export const MOCK_NIVEAUX: LookupItem[] = [ { id: 'niv01', libelle: 'Licence 3' }, { id: 'niv02', libelle: 'Master 1' }];
export const MOCK_FILIERES: LookupItem[] = [ { id: 'fil01', libelle: 'Génie Logiciel' }, { id: 'fil02', libelle: 'Cybersécurité' }];