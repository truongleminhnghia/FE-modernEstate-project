import clsx from "clsx"
import { twMerge } from "tailwind-merge"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebaseConfig";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function uploadImageToFirebase(file, path = "images") {
  // Tạo tham chiếu đến file trên firebase storage
  const fileRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
  // Upload file
  await uploadBytes(fileRef, file);
  // Lấy url download
  return await getDownloadURL(fileRef);
}
