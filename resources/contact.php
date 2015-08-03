<?php
include_once "lib/class.phpmailer.php";
include_once "config.php";
include_once "lib/util.php";


/*================================
Send email to marketing
================================*/
class RegistrationEmailTemplate
{
    public function render($data)
    {
        $body = "";
        foreach ($data as $key => $value) {
            $body .= "<b>" . ucfirst($key) . ":</b> $value<br/><br/>";
        }
        return $body;
    }
}

$addresses = array(
    array(
        "marketing@alpina.com.my"
    )
);
if ($config["isDev"] == true) {
    $addressesTest = array(
        array(
            "jacky@infradesign.com.my",
            "Jacky Lee"
        )
    );
    $addresses     = $addressesTest;
}
$templateData = $_POST;
$template     = new RegistrationEmailTemplate();
$body         = $template->render($templateData);
$name         = "no-reply@alpina.com.my";
$sender       = "no-reply@alpina.com.my";
$subject      = "Alpina Microsite Registration";
try {
    $mailer = new PHPMailer(true);
    $mailer->IsSMTP();
    $mailer->SMTPDebug = false;
    $mailer->SMTPAuth  = true;
    $mailer->Host      = $config['smtp']['host'];
    $mailer->Port      = $config['smtp']['port'];
    $mailer->Username  = $config['smtp']['user'];
    $mailer->Password  = $config['smtp']['pass'];
    $mailer->CharSet   = "UTF-8";
    $mailer->SetFrom($sender, $name);
    foreach ($addresses as $k => $address) {
        $mailer->AddAddress($address[0], $address[1]);
    }
    foreach ($addressesCC as $k => $address) {
        $mailer->AddCC($address[0], $address[1]);
    }
    $mailer->Subject = $subject;
    $mailer->MsgHTML($body);


    if (!$mailer->send()) {
        echo toJSON(1, 0, 'Error sending email to marketing', 'Please try again later', '');
        return;
    } else {
        //echo toJSON(0, 0, 'Success', '', '');
    }

}
catch (Exception $ex) {
    echo toJSON(1, 0, 'Error sending email to marketing : ' . $ex->getMessage(), 'Please try again later', '');
    return;
}

/*================================
Send email to registrant
================================*/
class RegistrantEmailTemplate
{
    public function render($data)
    {
        $body = "";
        $templatebody = file_get_contents("template/registrant.html");
        $templatebody = str_replace("@{title}", $data["title"] ? $data["title"]." ": "", $templatebody);
        $templatebody = str_replace("@{name}", $data["name"]  ?: "Valued Customer", $templatebody);
        $body = $templatebody;
        return $body;
    }
}

$addresses = array(
    array(
        $_POST["email"]
    )
);
if ($config["isDev"] == true) {
    $addressesTest = array(
        array(
            "jacky@infradesign.com.my",
            "Jacky Lee"
        )
    );
    $addresses     = $addressesTest;
}

$templateData = $_POST;
$template     = new RegistrantEmailTemplate();
$body         = $template->render($templateData);
$name         = "no-reply@alpina.com.my";
$sender       = "no-reply@alpina.com.my";
$subject      = "Alpina Microsite Registration";
try {
    $mailer = new PHPMailer(true);
    $mailer->IsSMTP();
    $mailer->SMTPDebug = false;
    $mailer->SMTPAuth  = true;
    $mailer->Host      = $config['smtp']['host'];
    $mailer->Port      = $config['smtp']['port'];
    $mailer->Username  = $config['smtp']['user'];
    $mailer->Password  = $config['smtp']['pass'];
    $mailer->CharSet   = "UTF-8";
    $mailer->SetFrom($sender, $name);
    foreach ($addresses as $k => $address) {
        $mailer->AddAddress($address[0], $address[1]);
    }
    foreach ($addressesCC as $k => $address) {
        $mailer->AddCC($address[0], $address[1]);
    }
    $mailer->Subject = $subject;
    $mailer->MsgHTML($body);
    if (!$mailer->send()) {
        echo toJSON(1, 0, 'Error sending email to registrant ', 'Please try again later', '');
        return;
    } else {
        //echo toJSON(0, 0, 'Success', '', '');
    }
}
catch (Exception $ex) {
    echo toJSON(1, 0, 'Error sending email to registrant : ' . $ex->getMessage(), 'Please try again later', '');
    return;
}

echo toJSON(0, 0, 'Success', '', '');

?>