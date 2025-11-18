export async function POST(req) {
  try {
    const body = await req.json();
    const { phoneNumber, templateName } = body;

     const token = process.env.WHATSAPP_ACCESS_TOKEN;
    const phoneId = process.env.PHONE_NUMBER_ID;

    console.log("SERVER TOKEN:", token);        // ✔ yaha print hoga
    console.log("SERVER PHONE ID:", phoneId);   // ✔ yaha print hoga
    console.log("RECEIVED BODY:", body);


        const url = `https://graph.facebook.com/v20.0/${process.env.PHONE_NUMBER_ID}/messages`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: phoneNumber,
        type: "template",
        template: {
          name: templateName,
          language: { code: "en_US" },
        },
      }),
    });

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
