import  {Hono} from "hono";
const app = new Hono();
import html from "./index.html";
import {cors} from "hono/cors";

app.use(cors());


let defaultWPM =238;

function  calculateReadingSpeed(sentence: string, wpm: number) {
  const wordCount:number = sentence.split(/\s+/).length;
  const minutes:number = wordCount/ wpm;
  const seconds:number = minutes * 60;
  return { wordCount,
     minutes: Number(minutes.toFixed(2)), 
     seconds: Number(seconds.toFixed(2)) };
}

// ======MARK: APIs ======

app.get("/", (c) => {
  return c.html(html);
});

app.get("/status", (c) => {
  return c.json({
    message: " Api is running",
  });
  
 });




app.get("/api/calculate", (c) => {
 const sentence=  c.req.query("Hello World");
 const wpm = c.req.query("wpm");  
 
 if (!sentence) {
  return c.json({message: "Feild sencence is required"}, 400);
 }
 const readingTime = calculateReadingSpeed(sentence, Number(wpm) || defaultWPM);

 return c.json({
  
    readingTime
});
})

let testStr="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero exercitationem reprehenderit, tempore aliquam doloribus nihil excepturi ullam ducimus unde! Voluptates officia et repudiandae est, ullam dolor cumque maiores laudantium sed alias, magni vero officiis, aliquid nesciunt laborum pariatur delectus eius ipsa. Amet adipisci, corporis vitae facilis distinctio eum quae, provident recusandae id facere perspiciatis culpa necessitatibus. Eligendi, cum sapiente! Optio exercitationem nemo nulla culpa molestiae sequi ducimus molestias, placeat odit quaerat, a expedita aspernatur eum perspiciatis ipsam voluptatem aut ex at nihil nam itaque assumenda similique accusantium. Amet at quis voluptates expedita! Quas distinctio officiis ea necessitatibus qui aliquid aut. Non est veniam illo, sequi repellat adipisci temporibus incidunt sint, consequatur quasi inventore minima excepturi quo aspernatur cumque distinctio dolores odit rerum obcaecati ab qui. Optio, voluptatum. Ut exercitationem reiciendis vero tenetur enim earum facilis itaque laborum atque, laboriosam temporibus accusamus maxime debitis. Dolor dignissimos perspiciatis totam neque consequuntur excepturi laborum eligendi assumenda quibusdam dolorum quas, enim, laudantium dolores. Ex at illum nulla. Quaerat ea non optio omnis! Dicta perspiciatis ipsum minus quis iure suscipit quasi aspernatur molestias recusandae saepe deserunt quam, ipsam ea nulla numquam a dolores enim vitae autem labore officiis facilis atque laborum. Minima voluptatibus error itaque commodi unde optio, quos corrupti sint aut, aliquam quas delectus in assumenda? Quia quas porro illum sed iusto quibusdam placeat consequatur. Maxime, neque qui perspiciatis sint rem velit animi possimus atque sunt iusto, odit molestiae repellat voluptatum recusandae!"
const x= calculateReadingSpeed(testStr,defaultWPM);
console.log(x);
app.post("/api/calculate",  async(c) => {
  const {sentence,wpm}=  await c.req.json();
  if (!sentence) {
    return c.json({message: "Feild sencence is required"}, 400);
  }
  const readingTime = calculateReadingSpeed(sentence, Number(wpm) || defaultWPM);

  return c.json({
    readingTime
});
 
});

export default app;