import { supabase } from "../../core/supabase/supabaseClient"
import imageCompression from 'browser-image-compression'
import { UserId } from "../../core/types"

interface InsertBookData {
    title: string
    author: string
    year: string
    isbn?: string
    publisher?: string
    page_count: number
    description: string
    genreid1: number
    genreid2?: number | null
    genreid3?: number | null
    imageurl: string
    bookurl: string
    rating: number
}

interface SaveNewBookProps {
    userId: UserId
    title: string
    author: string
    year: number
    isbn: string
    publisher: string
    pages: number
    description: string
    genreid1: number
    genreid2: number | null
    genreid3: number | null
    imageFile: File | null
    bookFile: File | null
}

export async function saveNewBook({ userId = "", title = "", author = "", year = 0, isbn = "", publisher = "", pages = 0, description = "", genreid1 = 0, genreid2 = null, genreid3 = null, imageFile, bookFile }: SaveNewBookProps) {
    if (!userId || userId==="") return { success: false, message: "No se ha encontrado el usuario. Por favor, inténtelo de nuevo más tarde." }

    if (title==="" || author==="" || year===0 || pages===0 || description==="" || genreid1===0 || !imageFile || !bookFile) return { success: false, message: "Faltan campos obligatorios" }

    // Obtener el id del usuario autenticado
    const { data } = await supabase.auth.getUser()
    const uuid_UserId = data?.user?.id;

    if (!uuid_UserId || uuid_UserId !== userId) {
        return { success: false, message: 'Usuario no autenticado' }
    }

    //*** START Subir IMAGEN de la portada ***
    const imageCompressOptions = {
        maxSizeMB: 1, // tamaño máximo en MB
        maxWidthOrHeight: 1920, // redimensionar si es necesario
        useWebWorker: true,
        fileType: 'image/webp',
    }

    const imageCompressedFile = await imageCompression(imageFile, imageCompressOptions)
    const imgFileName = `${crypto.randomUUID()}.webp`

    const { error: imgUploadError } = await supabase.storage
        .from('review-images')
        .upload(imgFileName, imageCompressedFile, { upsert: true })

    if (imgUploadError) {
        return { success: false, message: 'Error al subir la imagen', error: imgUploadError }
    }

    // Obtener URL publica de la imagen subida
    const { data: publicUrlImage } = supabase.storage
        .from('review-images')
        .getPublicUrl(imgFileName)

    if (!publicUrlImage || !publicUrlImage.publicUrl) {
        return { success: false, message: 'Error al obtener la URL de la imagen' }
    }

    const imageUrl = publicUrlImage.publicUrl
    //*** END Subir imagen de la portada ***

    //*** START Subir ARCHIVO del libro ***
    let finalFile
    let fileExtension

    // Si es imagen, comprimir y convertir a webp
    if (bookFile.type.startsWith('image/')) {
        const compressedFile = await imageCompression(bookFile, {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
            fileType: 'image/webp',
        })

        finalFile = compressedFile
        fileExtension = 'webp'

        // Si es PDF, dejar como está
    } else if (bookFile.type === 'application/pdf') {
        finalFile = bookFile
        fileExtension = 'pdf'
    } else {
        throw new Error('Tipo de archivo no admitido')
    }

    const bookFileName = `${crypto.randomUUID()}.${fileExtension}`

    const { error: bookUploadError } = await supabase.storage
        .from('books')
        .upload(bookFileName, finalFile, { upsert: true })

    if (bookUploadError) {
        return { success: false, message: 'Error al subir el archivo del libro', error: bookUploadError }
    }

    // Obtener URL publica de la imagen subida
    const { data: publicUrlBook } = supabase.storage
        .from('books')
        .getPublicUrl(bookFileName)

    if (!publicUrlBook || !publicUrlBook.publicUrl) {
        return { success: false, message: 'Error al obtener la URL del archivo del libro' }
    }

    const bookUrl = publicUrlBook.publicUrl
    //*** END Subir ARCHIVO del libro ***

    // Preparar los datos del insert
    const insertData: InsertBookData = {
        title: title,
        author: author,
        year: year.toString(),
        isbn: isbn,
        publisher: publisher,
        page_count: pages,
        description: description,
        genreid1: genreid1,
        genreid2: genreid2 === 0 ? null : genreid2,
        genreid3: genreid3 === 0 ? null : genreid3,
        imageurl: imageUrl,
        bookurl: bookUrl,
        rating: 0
    }

    // Insertar el nuevo libro
    const { error: insertError } = await supabase
        .from('books')
        .insert(insertData)

    if (insertError) {
        return { success: false, message: 'Error al registrar el libro', error: insertError }
    }

    return { success: true }
}
