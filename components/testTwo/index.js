import './index.scss';
import { format } from 'date-fns';

const formattedDate = format(new Date(), 'MM/dd/yyyy');

const dateEl = document.getElementById('date');
const textContent = document.createTextNode(formattedDate)
dateEl.appendChild(textContent)