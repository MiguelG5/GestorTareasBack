const nodemailer = require("nodemailer");

// Exporta la función enviarMail para que esté disponible fuera de este archivo
async function enviarMail(correo, datos) {
  const config = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "mikeyjaime99@gmail.com",
      pass: "blyemhetcacieosr",
    },
  };

  const mensaje = {
    from: "mikeyjaime99@gmail.com",
    to: correo,
    subject: "Recibo",
    html: `
      <div class="recibo">
  <div class="encabezado">
  <img src="../../../assets/img/logo-removebg-preview (1).png" width="90"
  height="90" alt="Logo de la tienda" class="logo">
    <h1>Recibo de Compra</h1>
    <p>Fecha: 24 de noviembre de 2023</p>
  </div>
  <hr>
  <div class="contenido">
    <p><strong>No. Comanda:</strong> ${datos.idcomanda}</p>
    <p><strong>No.pedido:</strong> ${datos.idpedido}</p>
    <p><strong>Nombre del cliente:</strong> ${datos.nombrecliente}</p> 
    <p><strong>Nombre del mesero:</strong> ${datos.nombremesero}</p>
    <p><strong>Platillo:</strong> ${datos.alimentoconsumir}</p>
    <p><strong>Bebida:</strong> ${datos.bebida}</p>
    <p><strong>Forma de pago:</strong> ${datos.tipopago}</p>
    <p><strong>Propina:</strong> ${datos.propina} %</p>
  </div>
  <hr>
  <div class="total">
    <p><strong>Total a Pagar:</strong> ${datos.total}</p>
  </div>
  <div class="agradecimiento">
    <p>¡Gracias por tu compra!</p>
    <p>Vuelve pronto.</p>
  </div>
</div>

<style>
.recibo {
  width: 300px;
  margin: 20px auto;
  border: 1px solid #ccc;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.encabezado h1 {
  font-size: 24px;
  margin-bottom: 5px;
}

.encabezado p {
  font-size: 12px;
  color: #666;
}

hr {
  border: 0.5px solid #ccc;
  margin: 10px 0;
}

.contenido p {
  font-size: 14px;
  margin-bottom: 5px;
}

.total p {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.agradecimiento p {
  font-size: 14px;
  margin-bottom: 5px;
  text-align: center;
}

.encabezado {
  text-align: center; /* Centrar el contenido del encabezado */
}

.logo {
  display: block;
  margin: 0 auto; /* Esto centrará el logo horizontalmente */
}

</style>
      `,
  };

  const transport = nodemailer.createTransport(config);

  const info = await transport.sendMail(mensaje);
}

async function sendCode(correo, codigo) {
  const config = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "mikeyjaime99@gmail.com",
      pass: "blyemhetcacieosr",
    },
  };

  const mensaje = {
    from: "mikeyjaime99@gmail.com",
    to: correo,
    subject: "Reestablecer Contraseña",
    html: `<!DOCTYPE html>
    <html lang="es">
    <head>
        <img src="../../../assets/img/logo-removebg-preview (1).png" width="90"
        height="90" alt="Logo de la tienda" class="logo">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Código de Restablecimiento de Contraseña - TareaTech</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
    
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);">
            
            <h2 style="color: #333333;">Código de Restablecimiento de Contraseña - TareaTech</h2>
            
            <p style="color: #666666;">Hola,</p>
            
            <p style="color: #666666;">Recibes este correo porque solicitaste restablecer tu contraseña en TareaTech, la plataforma para gestionar tareas eficientemente.</p>
            
            <p style="color: #666666;">Tu código de restablecimiento de contraseña es:</p>
            
            <div style="background-color: #f5f5f5; padding: 10px 20px; border-radius: 5px; margin-bottom: 20px;">
                <h3 style="margin: 0; color: #333333; font-size: 24px;">${codigo}</h3>
            </div>
            
            <p style="color: #666666;">Por favor, utiliza este código para restablecer tu contraseña. Este código es válido por un tiempo limitado.</p>
            
            <p style="color: #666666;">Si no solicitaste este cambio, por favor ignora este correo. Tu contraseña seguirá siendo la misma.</p>
            
            <p style="color: #666666;">Gracias,</p>
            
            <p style="color: #666666;">El equipo de TareaTech</p>
        
        </div>
    
    </body>
    </html>
    
`,
  };

  transport = nodemailer.createTransport(config);

  return transport.sendMail(mensaje);
}

async function secondFactor(correo, codigo) {
  const config = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "mikeyjaime99@gmail.com",
      pass: "blyemhetcacieosr",
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  };

  const mensaje = {
    from: "mikeyjaime99@gmail.com",
    to: correo,
    subject: "Autenticación en 2 pasos",
    html: `<!DOCTYPE html>
    <html lang="es">
    <head>
        <img src="../../../assets/img/logo-removebg-preview (1).png" width="90"
        height="90" alt="Logo de la tienda" class="logo">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Código de Segundo Factor de Autenticación - TareaTech</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
    
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);">
            
            <h2 style="color: #333333;">Código de Segundo Factor de Autenticación - TareaTech</h2>
            
            <p style="color: #666666;">Hola,</p>
            
            <p style="color: #666666;">Recibes este correo porque has optado por usar un segundo factor de autenticación para iniciar sesión en TareaTech, tu plataforma de referencia.</p>
            
            <p style="color: #666666;">Tu código de segundo factor de autenticación es:</p>
            
            <div style="background-color: #f5f5f5; padding: 10px 20px; border-radius: 5px; margin-bottom: 20px;">
                <h3 style="margin: 0; color: #333333; font-size: 24px;">${codigo}</h3>
            </div>
            
            <p style="color: #666666;">Por favor, utiliza este código como segundo paso para completar tu inicio de sesión en TareaTech. Este código es válido por un tiempo limitado.</p>
            
            <p style="color: #666666;">Si no intentaste iniciar sesión o no solicitaste este código, por favor ignora este correo.</p>
            
            <p style="color: #666666;">Gracias,</p>
            
            <p style="color: #666666;">El equipo de TareaTech</p>
        
        </div>
    
    </body>
    </html>`,
  };

  transport = nodemailer.createTransport(config);

  return transport.sendMail(mensaje);
}

async function validarcorreo(correo, codigo) {
  const config = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "mikeyjaime99@gmail.com",
      pass: "blyemhetcacieosr",
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  };

  const mensaje = {
    from: "mikeyjaime99@gmail.com",
    to: correo,
    subject: "Validación de correo",
    html: `<!DOCTYPE html>
    <html lang="es">
    <head>
        <img src="../../../assets/img/logo-removebg-preview (1).png" width="90"
        height="90" alt="Logo de la tienda" class="logo">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Validación de correo - TareaTech</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
    
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);">
            
            <h2 style="color: #333333;">Validación de Correo - TareaTech</h2>
            
            <p style="color: #666666;">Hola,</p>
            
            <p style="color: #666666;">Has recibido este correo porque hemos iniciado el proceso de validación de tu dirección de correo electrónico en TareaTech.</p>
            
            <p style="color: #666666;">Por favor, verifica tu dirección de correo electrónico copiando el codigo que aparece en seguida y pegandolo en la pagina.</p>
            
            <p style="color: #666666;">Este paso es necesario para asegurar que recibas información importante y para mantener la seguridad de tu cuenta.</p>

            <p style="color: #666666;">Tu código de validacion es:</p>
            
            <div style="background-color: #f5f5f5; padding: 10px 20px; border-radius: 5px; margin-bottom: 20px;">
                <h3 style="margin: 0; color: #333333; font-size: 24px;">${codigo}</h3>
            </div>
            
            <p style="color: #666666;">Si no has solicitado esta validación, por favor ignora este correo.</p>
            
            <p style="color: #666666;">Gracias por ser parte de TareaTech.</p>
            
            <p style="color: #666666;">Atentamente,</p>
            
            <p style="color: #666666;">El equipo de TareaTech</p>
        
        </div>
    
    </body>
    </html>`,
};


  transport = nodemailer.createTransport(config);

  return transport.sendMail(mensaje);
}

module.exports = {
  enviarMail,
  sendCode,
  secondFactor,
  validarcorreo,
};
