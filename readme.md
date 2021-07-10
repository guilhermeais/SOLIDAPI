<h1 align="center">
  Uma breve introdução aos principios S.O.L.I.D 🧐  
</h1>
<p align="center"> Há alguns dias, me veio a curiosidade de entender a ideia por trás dos principios <b>S.O.L.I.D</b> e como eles funcionam na prática.</p>
<p align="center"> E foi quando eu dei uma leve pesquisada e vi que isso não seria algo que se entenderia da noite pro dia (bom, pelo menos eu não...) .</p>
<p align="center"> Então, resolvi dar uma olhada mais afundo, e vou tentar resumir o que eu entendi até agora. Não é nada muito concreto, é um conhecimento que acredito que ainda esteja na minha memoria de curto prazo, mas tentar explicar isso tudo aqui, com certeza vai fazer com que esse conhecimento cresça e permaneça por mais tempo na minha memoria! Então, vamos lá!</p>
<i>Toda a aplicação foi feita e estudada usando um Code/Drop da <b>RocketSeat</b>, quem quiser ter acesso ao conteudo, é só <a href="https://www.youtube.com/watch?v=vAV4Vy4jfkc" target="_blank"  >clicar aqui</a> </i>
<h3 align="center">
  O que é o S.O.L.I.D? 
</h3>

<p>SOLID são princípios da programação orientada a objetos criados por <e>Michael Feathers</e> que tem como objetivo, facilitar o desenvolvimento de software, deixando ele mais fácil de entender, manter e estender.</p>
<p>Cada letra do S.O.L.I.D representa um principio, no qual.</p>
<ol>
  <li><b> S - Single Responsiblity Principle (Princípio da responsabilidade única)</b></li>
  <p>Cada classe/arquivo na nossa aplicação, deve ter apenas uma única responsabilidade. Aquela classe que faz de tudo, pode até parecer eficiente de primeira vista. Mas, quando as responsabilidades começarem a se misturar e for necessário alguma manutenção, será dificil modificar alguma resonsabilidade sem quebrar várias outras coisas que dependem dessa responsabilidade</p>
  <h3>Um exemplo de (SRP) Single Responsiblity Principle na nossa aplicação: </h3>
  <h4>Um exemplo, é a a classe resposável pela criação do usuário, a CreateUserUseCase (ela valida e cria), ela não se importa nem um pouco em como esse usuário será criado, qual banco de dados será usado nem nada do tipo... Ela apenas utiliza um método de uma interface que representa as possíveis manipulações com o usuário, como, criar, editar... E passa os dados validados e recebidos para ela, independente de como essa interface for implementada.</h4>
  
  <h4> - Exemplo da interface que representa as possívels manipulações com o usuário. É ela que permite a classe CreateUserUseCase não se importar em como salvamos o usuário</h4>
  
  ~~~typescript
import { User } from "../entities/User";
  // o contrato abaixo, representa os métodos que podemos usar para manipular o a entidade Usuário.
  export interface IUsersRepository {
    findAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User>;
    save(user: User): Promise<void>;
  }

~~~
  
   <h4> - Exemplo da classe CreateUserUseCase, é aqui que aplicamos o primeiro conceito, o SRP, </h4>
  
  ~~~typescript
  
import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider"; // ignore o mailProvider
import { IUsersRepository } from "../../repositories/IUsersReopnsitory"; // importamos a interface que representa as possíveis manipulações com o usuário no BD
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository, // o construtor da classe, recebe alguma implemenetação que siga a IUsersRepository, independente de como foi feita essa implementação, seja no MySql, seja no Postgress... 
    private mailProvider: IMailProvider // ignore o mailProvider
  ) {}
  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail( // verificamos se já existe um usuário com o email recebido aqui (esse email veio da controller)
      data.email
    );

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    const user = new User(data);

    await this.usersRepository.save(user); // e salvamos o usuário se estiver tudo OK.


    await this.mailProvider.sendMail({ // ignore o mailProvider
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: "MyApp",
        email: "squadMyApp@myapp.com",
      },
      subject: "Welcome to our plataform!",
      body: "<p>You are one of us new!</p>",
    });
  }
}

~~~
  
  <p>Ou seja, aqui aplicamos o SRP, a classe tem somente a funcionalidade de salvar o usuário com os dados que ela recebeu e seguir algumas regras que ela tem que validar. Mas a responsabilidade de manipular o usuário em si, está em outra classe. </p>

  <li><b> O - Open-Closed Principle (Princípio Aberto-Fechado)</b></li>
  
  <h4 align="center"> 
	🚧  Em construção...  🚧
</h4>
  
  <li><b> L - Liskov Substitution Principle (Princípio da substituição de Liskov)</b></li>
  
   <h4 align="center"> 
	🚧  Em construção...  🚧
</h4>
  
  <li><b> I - Interface Segregation Principle (Princípio da Segregação da Interface)</b></li>
  
   <h4 align="center"> 
	🚧  Em construção...  🚧
</h4>
  
  <li><b> D - Dependency Inversion Principle (Princípio da inversão da dependência)</b></li>
  
   <h4 align="center"> 
	🚧  Em construção...  🚧
</h4>
  

</ol>
