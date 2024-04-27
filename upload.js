// import multer from 'multer';
// import { GridFsStorage } from 'multer-gridfs-storage';

// const storage = new GridFsStorage({
//     url: `mongodb+srv://kanishka:Aqpfk15rpTGS578W@cluster05.pgwmpx4.mongodb.net/GroceryApplication?retryWrites=true&w=majority&appName=Cluster05`,
//     options: { useNewUrlParser: true },
//     file: (request, file) => {
//         const match = ["image/png", "image/jpg"];

//         if(match.indexOf(file.memeType) === -1) 
//             return`${Date.now()}-blog-${file.originalname}`;

//         return {
//             bucketName: "photos",
//             filename: `${Date.now()}-blog-${file.originalname}`
//         }
//     }
// });

// export default multer({storage}); 

import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import path from 'path';

const storage = new GridFsStorage({
    url: `mongodb+srv://kanishka:Aqpfk15rpTGS578W@cluster05.pgwmpx4.mongodb.net/GroceryApplication?retryWrites=true&w=majority&appName=Cluster05`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if (match.indexOf(file.memeType) === -1) 
            return path.join(__dirname, `uploads/${Date.now()}-blog-${file.originalname}`);

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});

export default multer({ storage });
