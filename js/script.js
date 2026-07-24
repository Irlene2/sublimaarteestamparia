
const API_URL =
    "COLE_AQUI_A_URL_DA_SUA_API";





const FORMULARIO_ID =
    "formContato";





const STATUS_ID =
    "mensagemStatus";





document.addEventListener(

    "DOMContentLoaded",

    function () {


        /*
           Inicializa o formulário
        */


        inicializarFormulario();



       

        inicializarMascaraWhatsApp();



       


        inicializarLinksInternos();


    }

);





function inicializarFormulario() {


    


    const formulario =

        document.getElementById(
            FORMULARIO_ID
        );



    
    if (!formulario) {

        return;

    }





    formulario.addEventListener(

        "submit",

        function (evento) {


            enviarFormulario(

                evento,

                formulario

            );


        }

    );

}





async function enviarFormulario(

    evento,

    formulario

) {


  


    evento.preventDefault();





    const botaoEnviar =

        formulario.querySelector(

            "button[type='submit'], input[type='submit']"

        );



    


    const mensagemStatus =

        obterMensagemStatus(

            formulario

        );



    


    const formularioValido =

        validarFormulario(

            formulario,

            mensagemStatus

        );




    if (!formularioValido) {

        return;

    }



    if (

        API_URL ===
        "COLE_AQUI_A_URL_DA_SUA_API"

    ) {


        mostrarStatus(

            mensagemStatus,

            "A API ainda não foi configurada. Adicione a URL do Google Apps Script no arquivo js/script.js.",

            "erro"

        );


        console.error(

            "ERRO: Configure a constante API_URL."

        );


        return;

    }





    alterarEstadoBotao(

        botaoEnviar,

        true

    );



    


    mostrarStatus(

        mensagemStatus,

        "Enviando sua solicitação...",

        "carregando"

    );



    

    const formularioData =

        new FormData(

            formulario

        );



   


    const dadosPedido = {


        


        nome:

            formularioData.get(
                "Nome"
            ) || "",



        


        email:

            formularioData.get(
                "Email"
            ) || "",



    


        whatsapp:

            formularioData.get(
                "WhatsApp"
            ) || "",



       


        produto:

            formularioData.get(
                "Produto"
            ) || "",



       


        quantidade:

            formularioData.get(
                "Quantidade"
            ) || "",



      
        assunto:

            formularioData.get(
                "Assunto"
            ) || "",



        


        mensagem:

            formularioData.get(
                "Mensagem"
            ) || "",



        
        data:

            new Date().toISOString(),



        

        origem:

            "Site Sublima Arts"

    };





    const jsonPedido =

        JSON.stringify(

            dadosPedido

        );





    console.log(

        "JSON enviado para a API:",

        jsonPedido

    );



  


    try {


        const resposta =

            await fetch(

                API_URL,

                {


                   


                    method:

                        "POST",



                    


                    headers: {


                        "Content-Type":

                            "text/plain;charset=utf-8"


                    },



                  


                    body:

                        jsonPedido

                }

            );



      


        let resultado;



        try {


            resultado =

                await resposta.json();


        } catch (erroJSON) {


         


            resultado = {

                success: false,

                message:

                    "A API retornou uma resposta inválida."

            };


        }



       

        console.log(

            "Resposta da API:",

            resultado

        );



     


        if (

            resultado.success === true

        ) {


            


            mostrarStatus(

                mensagemStatus,

                resultado.message ||

                "Sua solicitação foi enviada com sucesso! Em breve entraremos em contato.",

                "sucesso"

            );





            formulario.reset();



           


            removerErros(

                formulario

            );



        } else {


         


            throw new Error(

                resultado.message ||

                "Não foi possível enviar a solicitação."

            );

        }



    } catch (erro) {


     


        console.error(

            "Erro na integração com a API:",

            erro

        );



        mostrarStatus(

            mensagemStatus,

            "Não foi possível enviar sua mensagem. Tente novamente ou entre em contato pelo WhatsApp.",

            "erro"

        );


    } finally {


 


        alterarEstadoBotao(

            botaoEnviar,

            false

        );


    }

}






function validarFormulario(

    formulario,

    mensagemStatus

) {


    /*
       Procura todos os campos
       obrigatórios.
    */


    const camposObrigatorios =

        formulario.querySelectorAll(

            "[required]"

        );



   


    let valido = true;



   


    camposObrigatorios.forEach(

        function (campo) {


         

            if (

                !campo.value.trim()

            ) {


                campo.classList.add(

                    "campo-invalido"

                );


                valido = false;


            } else {


                campo.classList.remove(

                    "campo-invalido"

                );


            }


        }

    );



   


    if (!valido) {


        mostrarStatus(

            mensagemStatus,

            "Preencha todos os campos obrigatórios.",

            "erro"

        );


        return false;

    }



    


    const campoEmail =

        document.getElementById(

            "email"

        );



    /*
       Valida o e-mail.
    */


    if (

        campoEmail &&

        !validarEmail(

            campoEmail.value

        )

    ) {


        campoEmail.classList.add(

            "campo-invalido"

        );


        mostrarStatus(

            mensagemStatus,

            "Digite um endereço de e-mail válido.",

            "erro"

        );


        campoEmail.focus();


        return false;

    }



  


    return true;

}






function validarEmail(

    email

) {


   


    const regex =

        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



    return regex.test(

        email.trim()

    );

}






function obterMensagemStatus(

    formulario

) {


  


    let mensagemStatus =

        document.getElementById(

            STATUS_ID

        );





    if (!mensagemStatus) {


        mensagemStatus =

            document.createElement(

                "div"

            );


        mensagemStatus.id =

            STATUS_ID;



        mensagemStatus.setAttribute(

            "role",

            "alert"

        );



  


        formulario.appendChild(

            mensagemStatus

        );

    }



    return mensagemStatus;

}






function mostrarStatus(

    elemento,

    mensagem,

    tipo

) {


    if (!elemento) {

        return;

    }



    


    elemento.classList.remove(

        "sucesso",

        "erro",

        "carregando"

    );



    

    elemento.classList.add(

        tipo

    );



   


    elemento.textContent =

        mensagem;



  


    elemento.style.display =

        "block";



  


    elemento.scrollIntoView({

        behavior:

            "smooth",

        block:

            "nearest"

    });

}




   CONTROLE DO BOTÃO
========================================================= */


function alterarEstadoBotao(

    botao,

    carregando

) {


    if (!botao) {

        return;

    }



  


    if (

        !botao.dataset.textoOriginal

    ) {


        botao.dataset.textoOriginal =

            botao.tagName === "INPUT"

                ? botao.value

                : botao.textContent;

    }



   


    if (carregando) {


        botao.disabled =

            true;



        if (

            botao.tagName === "INPUT"

        ) {


            botao.value =

                "ENVIANDO...";


        } else {


            botao.textContent =

                "ENVIANDO...";

        }



    } else {


    


        botao.disabled =

            false;



        if (

            botao.tagName === "INPUT"

        ) {


            botao.value =

                botao.dataset.textoOriginal;


        } else {


            botao.textContent =

                botao.dataset.textoOriginal;

        }

    }

}






function removerErros(

    formulario

) {


    const campos =

        formulario.querySelectorAll(

            ".campo-invalido"

        );



    campos.forEach(

        function (campo) {


            campo.classList.remove(

                "campo-invalido"

            );


        }

    );

}




function inicializarMascaraWhatsApp() {


   


    const campoWhatsApp =

        document.getElementById(

            "whatsapp"

        );



  

    if (!campoWhatsApp) {

        return;

    }



    campoWhatsApp.addEventListener(

        "input",

        function () {


            


            let valor =

                campoWhatsApp.value.replace(

                    /\D/g,

                    ""

                );



          


            valor =

                valor.substring(

                    0,

                    11

                );



                if (

                valor.length <= 10

            ) {


                valor =

                    valor.replace(

                        /^(\d{2})(\d)/,

                        "($1) $2"

                    );


                valor =

                    valor.replace(

                        /(\d{4})(\d)/,

                        "$1-$2"

                    );


            } else {




                valor =

                    valor.replace(

                        /^(\d{2})(\d)/,

                        "($1) $2"

                    );


                valor =

                    valor.replace(

                        /(\d{5})(\d)/,

                        "$1-$2"

                    );

            }


            campoWhatsApp.value =

                valor;


        }

    );

}






function inicializarLinksInternos() {



    const links =

        document.querySelectorAll(

            'a[href^="#"]'

        );



    links.forEach(

        function (link) {


            link.addEventListener(

                "click",

                function (evento) {


                    const destino =

                        document.querySelector(

                            link.getAttribute(

                                "href"

                            )

                        );



                    if (destino) {


                        evento.preventDefault();



                        destino.scrollIntoView({

                            behavior:

                                "smooth",

                            block:

                                "start"

                        });

                    }


                }

            );

        }

    );

}

<!DOCTYPE html>
<html lang="pt-BR">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <meta
        name="description"
        content="Entre em contato com a Sublima Arte para solicitar seu orçamento."
    >

    <link
        rel="stylesheet"
        href="css/style.css"
    >

    <link
        rel="icon"
        href="img/logo1.png"
        type="image/x-icon"
    >

    <title>
        Contato | Sublima Arte
    </title>

</head>


<body>


  

    <header class="cabecalho">

        <nav class="menu-principal">

            <a
                href="index.html"
                class="logo-menu"
            >
                SUBLIMA ARTE
            </a>


            <ul>

                <li>
                    <a href="index.html">
                        Home
                    </a>
                </li>


                <li>
                    <a href="sobre.html">
                        Sobre
                    </a>
                </li>


                <li>
                    <a href="galeria.html">
                        Galeria
                    </a>
                </li>


                <li>
                    <a href="tabelas.html">
                        Tabelas de referência
                    </a>
                </li>


                <li>
                    <a
                        href="contato.html"
                        class="pagina-atual"
                    >
                        Contato
                    </a>
                </li>

            </ul>

        </nav>

    </header>



 

    <main>


        <section class="titulo-pagina">

            <p>
                FALE CONOSCO
            </p>

            <h1>
                Contato
            </h1>

            <span>
                Estamos prontos para transformar
                sua ideia em realidade.
            </span>

        </section>



       

        <section class="contato-container">


          

            <div class="localizacao">


                <div class="cabecalho-contato">

                    <p>
                        ONDE ESTAMOS
                    </p>

                    <h2>
                        Nossa localização
                    </h2>

                </div>


                <div class="mapa-container">

                    <iframe

                        class="mapa"

                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.942193451484!2d-43.42050632574594!3d-22.803338634180033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9966b25ae1678b%3A0x8720956127e31b6!2sR.%20Osvaldo%20Cruz%2C%2052%20-%20Centro%2C%20Nil%C3%B3polis%20-%20RJ%2C%2026530-100!5e1!3m2!1spt-BR!2sbr!4v1784492094266!5m2!1spt-BR!2sbr"

                        title="Localização da Sublima Arte"

                        allowfullscreen

                        loading="lazy"

                        referrerpolicy="strict-origin-when-cross-origin">

                    </iframe>

                </div>


                <div class="endereco">

                    <h3>
                        Sublima Arte
                    </h3>

                    <p>
                        R. Osvaldo Cruz, 52
                        <br>
                        Centro - Nilópolis - RJ
                    </p>

                </div>


            </div>



       

            <aside class="sidebar">


                <div class="cabecalho-contato">

                    <p>
                        FALE CONOSCO
                    </p>

                    <h2>
                        Envie sua mensagem
                    </h2>

                    
                </div>



         

                <form

                    class="contato"

                    action="https://api.web3forms.com/submit"

                    method="POST"


                >


                   

                    <input

                        type="hidden"

                        name="access_key"

                        value="745f84bd-ab41-4b55-8f3a-c49e217b43eb"

                    >



                   

                    <input

                        type="hidden"

                        name="subject"

                        value="Novo contato - Sublima Arte"

                    >



                    

                    <div class="campo">


                        <label for="nome">
                            Nome
                        </label>


                        <input

                            type="text"

                            id="nome"

                            name="name"

                            placeholder="Digite seu nome"

                            autocomplete="name"

                            required

                        >


                    </div>




                    <div class="campo">


                        <label for="email">
                            E-mail
                        </label>


                        <input

                            type="email"

                            id="email"

                            name="email"

                            placeholder="Digite seu melhor e-mail"

                            autocomplete="email"

                            required

                        >


                    </div>



                   

                    <div class="campo">


                        <label for="assunto">
                            Assunto
                        </label>


                        <input

                            type="text"

                            id="assunto"

                            name="assunto"

                            placeholder="Como podemos ajudar?"

                        >


                    </div>




                    <div class="campo">


                        <label for="mensagem">
                            Mensagem
                        </label>


                        <textarea

                            id="mensagem"

                            name="message"

                            placeholder="Escreva sua mensagem..."

                            required

                        ></textarea>


                    </div>



                    

                    
                   

                    <button

                        type="submit"

                        class="botao"

                    >

                       

                    </button>


                </form>


            </aside>


        </section>


    </main>





    <footer class="rodape">


        <div class="rodape-conteudo">


            <img

                src="img/AUZIER.LOGO1.png"

                alt="Logo Auzier"

                width="30"

            >


            <p>

                © 2026 -
                Desenvolvido por
                Irlene Auzier

            </p>


        </div>


    </footer>



    <script src="js/script.js"></script>


</body>

</html>


