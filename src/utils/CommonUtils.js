import { reject } from "lodash";

class CommonUtils { 
    //convert từ base 64 sang BLOB
    static getBase64(file) {
        return new Promise((resolve,reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
}

export default CommonUtils;