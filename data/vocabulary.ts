
import { Word, Category } from '../types';

export const VOCABULARY: Word[] = [
  // ANIMALS
  { id: 'a1', word_en: 'Lion', meaning_ur: 'شیر', meaning_ps: 'شیر', category: Category.ANIMALS, image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=400' },
  { id: 'a2', word_en: 'Elephant', meaning_ur: 'ہاتھی', meaning_ps: 'ہاتی', category: Category.ANIMALS, image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=400' },
  { id: 'a3', word_en: 'Cat', meaning_ur: 'بلی', meaning_ps: 'پشو', category: Category.ANIMALS, image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400' },
  { id: 'a4', word_en: 'Dog', meaning_ur: 'کتا', meaning_ps: 'سپ', category: Category.ANIMALS, image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400' },
  { id: 'a5', word_en: 'Cow', meaning_ur: 'گائے', meaning_ps: 'غوا', category: Category.ANIMALS, image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=400' },
  { id: 'a6', word_en: 'Camel', meaning_ur: 'اونٹ', meaning_ps: 'اوښ', category: Category.ANIMALS, image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dee62?w=400' },
  { id: 'a7', word_en: 'Goat', meaning_ur: 'بکری', meaning_ps: 'وزه', category: Category.ANIMALS, image: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?w=400' },
  { id: 'a8', word_en: 'Horse', meaning_ur: 'گھوڑا', meaning_ps: 'اس', category: Category.ANIMALS, image: 'https://images.unsplash.com/photo-1534073737327-5ee7b37ff41d?w=400' },
  
  // FRUITS
  { id: 'f1', word_en: 'Mango', meaning_ur: 'آم', meaning_ps: 'آم', category: Category.FRUITS, image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400' },
  { id: 'f2', word_en: 'Apple', meaning_ur: 'سیب', meaning_ps: 'مڼه', category: Category.FRUITS, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400' },
  { id: 'f3', word_en: 'Banana', meaning_ur: 'کیلا', meaning_ps: 'کیلا', category: Category.FRUITS, image: 'https://images.unsplash.com/photo-1571771894821-ad9958a3f747?w=400' },
  { id: 'f4', word_en: 'Grapes', meaning_ur: 'انگور', meaning_ps: 'انگور', category: Category.FRUITS, image: 'https://images.unsplash.com/photo-1537640538966-79f369b41f8f?w=400' },
  { id: 'f5', word_en: 'Orange', meaning_ur: 'مالٹا', meaning_ps: 'مالٹا', category: Category.FRUITS, image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400' },
  { id: 'f6', word_en: 'Pomegranate', meaning_ur: 'انار', meaning_ps: 'انار', category: Category.FRUITS, image: 'https://images.unsplash.com/photo-1541344999736-83eca272f6fc?w=400' },
  { id: 'f7', word_en: 'Guava', meaning_ur: 'امرود', meaning_ps: 'امرود', category: Category.FRUITS, image: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=400' },

  // SCHOOL
  { id: 's1', word_en: 'Bag', meaning_ur: 'بستہ', meaning_ps: 'بکسه', category: Category.SCHOOL, image: 'https://images.unsplash.com/photo-1553062407-98eeb94c6a62?w=400' },
  { id: 's2', word_en: 'Pencil', meaning_ur: 'پینسل', meaning_ps: 'پنسل', category: Category.SCHOOL, image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400' },
  { id: 's3', word_en: 'Book', meaning_ur: 'کتاب', meaning_ps: 'کتاب', category: Category.SCHOOL, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400' },
  { id: 's4', word_en: 'Eraser', meaning_ur: 'ربر', meaning_ps: 'ربر', category: Category.SCHOOL, image: 'https://images.unsplash.com/photo-1586075010620-21a47321683d?w=400' },
  { id: 's5', word_en: 'School', meaning_ur: 'سکول', meaning_ps: 'سکول', category: Category.SCHOOL, image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400' },

  // COLORS
  { id: 'c1', word_en: 'Red', meaning_ur: 'لال', meaning_ps: 'سور', category: Category.COLORS, image: 'https://images.unsplash.com/photo-1541323335324-497d66a1d0f6?w=400' },
  { id: 'c2', word_en: 'Blue', meaning_ur: 'نیلا', meaning_ps: 'شین', category: Category.COLORS, image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400' },
  { id: 'c3', word_en: 'Green', meaning_ur: 'سبز', meaning_ps: 'شین', category: Category.COLORS, image: 'https://images.unsplash.com/photo-1501004318641-729e8e26bd15?w=400' },
  { id: 'c4', word_en: 'Yellow', meaning_ur: 'پیلا', meaning_ps: 'ژړ', category: Category.COLORS, image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400' },
  { id: 'c5', word_en: 'Black', meaning_ur: 'کالا', meaning_ps: 'ت تور', category: Category.COLORS, image: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=400' },

  // NUMBERS
  { id: 'n1', word_en: 'One', meaning_ur: 'ایک', meaning_ps: 'یو', category: Category.NUMBERS, image: 'https://images.unsplash.com/photo-1502593006263-000c924edf76?w=400' },
  { id: 'n2', word_en: 'Two', meaning_ur: 'دو', meaning_ps: 'دوه', category: Category.NUMBERS, image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400' },
  { id: 'n3', word_en: 'Three', meaning_ur: 'تین', meaning_ps: 'دری', category: Category.NUMBERS, image: 'https://images.unsplash.com/photo-1454165833767-027ffea9e778?w=400' },
  { id: 'n4', word_en: 'Four', meaning_ur: 'چار', meaning_ps: 'څلور', category: Category.NUMBERS, image: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=400' },
  { id: 'n5', word_en: 'Five', meaning_ur: 'پانچ', meaning_ps: 'پنځه', category: Category.NUMBERS, image: 'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?w=400' },

  // BODY PARTS
  { id: 'b1', word_en: 'Eye', meaning_ur: 'آنکھ', meaning_ps: 'سترګه', category: Category.BODY, image: 'https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?w=400' },
  { id: 'b2', word_en: 'Hand', meaning_ur: 'ہاتھ', meaning_ps: 'لاس', category: Category.BODY, image: 'https://images.unsplash.com/photo-1493676303816-0a4269f8c087?w=400' },
  { id: 'b3', word_en: 'Nose', meaning_ur: 'ناک', meaning_ps: 'پزه', category: Category.BODY, image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400' },
  { id: 'b4', word_en: 'Ear', meaning_ur: 'کان', meaning_ps: 'غوږ', category: Category.BODY, image: 'https://images.unsplash.com/photo-1520127873599-28198f108d44?w=400' },
  { id: 'b5', word_en: 'Foot', meaning_ur: 'پاؤں', meaning_ps: 'پښه', category: Category.BODY, image: 'https://images.unsplash.com/photo-1560769129-d53b47556e06?w=400' },
];
