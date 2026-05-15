
import org.openqa.selenium.WebDriver;

import org.openqa.selenium.By;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.Scanner;

public class Graphic {
    public static void main(String[] args) throws InterruptedException {


    }
    //1. Graphic.java (20 point)
    //Buatlah sebuah graphic sederhana menggunakan bintang berdasarkan data yang diinputkan oleh
    //pengguna. Banyak data yang diinputkan oleh pengguna sebanyak 5 data dalam sekali inputan (Array).
    //Setiap banyak bintang, diambil dari presentase setiap inputan terhadap banyak data.
    public String countPercentage(int[] arr) {
        int sum = 0; //untuk total semua nilai untuk jadi pembagi
        int numberPercentage = 0; //untuk mendapatkan persentase inputan
        for (int i = 0; i < arr.length; i++) {
            sum = arr[i]++; //tambah nilai sum per array. sintaks lupa
        }
        for (int j = 0; j < arr.length; j++) {
            numberPercentage = arr[j]/sum * 100;
            for (int k = 0; k < numberPercentage; k++) {
                return "*"; // print asterisk sesuai numberPercentage
            }
        }


    }
    //2. FindContact.java (20 point)
    //Buatlah sebuah aplikasi untuk melakukan pencarian kontak. Pencarian kontak berdasarkan nama dan
    //club. Jika salah satu termasuk yang dicari, maka tampilkanlah data yang ditemukan. Setiap pencarian,
    //tidak memperhatikan huruf besar atau kecil dari pencarian.
    public String FindContact(String keyword) {

        arr[] data = ["08123123121 Lionel Messi Barcelona \n" +
                "08123123122 Cristiano Ronaldo Real Madrid \n" +
                "08123123123 Ricardo Kaka AC Milan \n" +
                "08123123124 Karim Benzema Real Madrid \n" +
                "08123123125 David de Gea Manchester United \n"]
        if (keyword.equals("")) {
            System.out.print("Maaf, nama yang Anda cari tidak ditemukan.");
        }

        for (int i = 0; i < data.length; i++) {
            if (keyword.contentEquals(arr[i])) {
                System.out.print(arr[i]);
            } else {
                System.out.print("Maaf, nama yang Anda cari tidak ditemukan.");

            }
        }

        //3. ReplaceQuiz.java (20 point)
        //Buatlah suatu aplikasi sederhana untuk menebak kalimat. Kalimat soal yang akan ditebak, telah  disediakan oleh sistem. Pengguna ditugaskan menginputkan huruf satu persatu sampai kalimat  tersusun sempurna. Jika tersusun sempurna, maka sistem akan berhenti.
        //Jika inputan salah, maka pengguna diminta untuk melakukan penginputan kembali sebuah huruf  sampai kalimat tersusun sempurna.

        public String ReplaceQuiz(String keyword) {
            String sentence =  "Makan Nasi";
            Char[] splitSentence = keyword.split(Sentence); // pecah jadi char
            for (int i = 0; i < sentence.length; i++) {
                if (keyword.contentEquals(splitSentence[i])) { //kalau inputan user equals char
                    return splitSentence[i]; //return char sentence yang ada di array char
                }
            }
            }

        }

}
