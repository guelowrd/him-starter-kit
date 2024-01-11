import * as _noirHelpers from './utils/noirHelpers';
import * as _tlockjs from 'tlock-js';
import * as _identity from '@semaphore-protocol/identity'
import * as _group from '@semaphore-protocol/group'
import * as _proof from '@semaphore-protocol/proof'

export const Utils = _noirHelpers; 
export const TLockJS = _tlockjs;

export const Semaphore = {
    identity: _identity,
    group: _group,
    proof: _proof
}