/** simple JS library for doing commit reveal, meant to be paired with the solidity commit reveal file **/ 
import { keccak256 } from 'ethers'

const DEFAULT_PREFIX = "CommitCrypt"

type SecretJSON = {
    type: string,
    value: string,
}

const secretFromJson = (raw: SecretJSON): Secret => {
    if (raw.type == "string") {
        return new Secret(raw.value);
    } else if (raw.type == "Uint8Array") {
        return new Secret(new Uint8Array(Buffer.from(raw.value, 'base64')));
    } else {
        throw new Error("unexpected input type")
    }
}

export class Secret {
    secret: string | Uint8Array;
    commitment: string;
    constructor(secret: string | Uint8Array) {
        this.secret = secret;
        this.commitment = keccak256(this.secret);
    }
    toJSON(): Object {
        let value = "";
        let type = "";
        if (typeof this.secret === "string") {
            type = "string";
            value = this.secret.toString();
        } else {
            type = "Uint8Array";
            // Assuming the secret is a Uint8Array, convert it to a Base64 string
            value = Buffer.from(this.secret).toString('base64');
        }
        return {
            type,
            value
        }
    }
}

export class CommitCrypt {
    prefix: string;
    secrets: Secret[];
    constructor(storagePrefix: string | undefined) {
        this.prefix = storagePrefix || DEFAULT_PREFIX;
        const existingSecrets = sessionStorage.getItem(`${this.prefix}::secrets`);
        this.secrets = existingSecrets == null ? [] : JSON.parse(existingSecrets).map((rawSecret) => {
            return secretFromJson(rawSecret);
        });
    }

    _snapshot() {
        sessionStorage.setItem(`${this.prefix}::secrets`, JSON.stringify(this.secrets));
    }

    createSecret(secret: string | Uint8Array) {
        this.secrets.push(new Secret(secret))
        this._snapshot();
    }

    findSecret(commitment: string) {
        this.secrets.find((s) => {
            return s.commitment == commitment;
        })
    }

    clearSecrets() {
        this.secrets = [];
        this._snapshot();
    }
}


