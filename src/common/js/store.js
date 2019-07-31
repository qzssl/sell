export function saveToLocal(id,key,val) {
    let seller = localStorage._seller_;
    if (!seller){
        seller = {};
        seller[id] = {};
    } else {
        seller = JSON.parse(seller);
        if (!seller){
            seller[id] = {};
        }
    }
    seller[id][key] = val;
    localStorage._seller_ = JSON.stringify(seller);
}

export function loadFromLocal(id,key,val) {
    let seller = localStorage._seller_;
    if (!seller){
        return val;
    }
    seller = JSON.parse(seller)[id];
    if (!seller){
        return val;
    }
    let ret = seller[key];
    return ret || val;
}
