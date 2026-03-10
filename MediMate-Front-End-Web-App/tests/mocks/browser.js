import { setupWorker } from 'msw/browser';
import { handlers } from './mswHandlers';

export const worker = setupWorker(...handlers);
