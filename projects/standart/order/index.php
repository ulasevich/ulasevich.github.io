<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Заказать стенд | Строительно-монтажная фирма «СтендАрт»");
?>
<aside class="left-sidebar">
        
            <?include($_SERVER["DOCUMENT_ROOT"]."/left_menu.php");?> 
            <?include($_SERVER["DOCUMENT_ROOT"]."/left_news.php");?>
        
            
</aside><!-- .left-sidebar -->
<main class="content">
<?
    $captha = true;//инициализация капчи
    include_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/classes/general/captcha.php");
    $cpt = new CCaptcha();
    $captchaPass = COption::GetOptionString("main", "captcha_password", "");
    if(strlen($captchaPass) <= 0){
        $captchaPass = randString(10);
        COption::SetOptionString("main", "captcha_password", $captchaPass);
    }
    $cpt->SetCodeCrypt($captchaPass);
                    
                    
    if($_REQUEST["sendform"]){ //понеслась
        if($APPLICATION->CaptchaCheckCode($_POST["captcha_word"], $_POST["captcha_code"])){
            CModule::IncludeModule("iblock");
            $dump = "<table>";
            if($_FILES["PLAN"]['tmp_name']||$_FILES["LOGO"]['tmp_name']||$_FILES["BANNER"]['tmp_name']){
                $PROP = array();
                $el = new CIBlockElement;
                if($_FILES["PLAN"]['tmp_name']) $PROP["PLAN"] = $_FILES["PLAN"]; 
                if($_FILES["LOGO"]['tmp_name']) $PROP["LOGO"] = $_FILES["LOGO"]; 
                if($_FILES["BANNER"]['tmp_name']) $PROP["BANNER"] = $_FILES["BANNER"]; 

                if(!$_REQUEST["COMPANY"]) $_REQUEST["COMPANY"] = "Неизвестная компания";
                $arLoadProductArray = Array(
                  
                  "IBLOCK_ID"      => 11,
                  "PROPERTY_VALUES"=> $PROP,
                  "NAME"           => $_REQUEST["COMPANY"],
                  "ACTIVE"         => "Y",            // активен
                  
                  );

                if($PRODUCT_ID = $el->Add($arLoadProductArray)){
                    $arSelect = Array("ID", "PROPERTY_PLAN", "PROPERTY_LOGO","PROPERTY_BANNER",);
                    $arFilter = Array("IBLOCK_ID"=>11,"ID"=>$PRODUCT_ID, "ACTIVE"=>"Y");
                    $res = CIBlockElement::GetList(Array(), $arFilter, false, Array("nPageSize"=>1), $arSelect);
                    while($ob = $res->Fetch())
                    {
                        
                        $plan = CFile::GetPath($ob["PROPERTY_PLAN_VALUE"]);
                        $logo = CFile::GetPath($ob["PROPERTY_LOGO_VALUE"]);
                        $banner = CFile::GetPath($ob["PROPERTY_BANNER_VALUE"]);
                        //echo"<pre>";var_dump($plan);echo"</pre>";
                    }
                    
                }
                  
            }
            //echo"<pre>";var_dump($_FILES);echo"</pre>"; exit();
            $dump.="<tr><td><h2>Требования к стенду</h2></td></tr>";
            if($_REQUEST["COMPANY"]){
                  $dump.="<tr><td>Компания {$_REQUEST["COMPANY"]}</td></tr>";
            }
            if($_REQUEST["CONTACT_FACE"]){
                  $dump.="<tr><td>Контактное лицо {$_REQUEST["CONTACT_FACE"]}</td></tr>";
            }
            if($_REQUEST["PHONE"]){
                  $dump.="<tr><td>Телефон/факс {$_REQUEST["PHONE"]}</td></tr>";
            }
            if($_REQUEST["EMAIL"]){
                  $dump.="<tr><td>E-mail {$_REQUEST["EMAIL"]}</td></tr>";
            }
            if($_REQUEST["SITE"]){
                  $dump.="<tr><td>Сайт {$_REQUEST["SITE"]}</td></tr>";
            }
            if($_REQUEST["NAME_EXHIBITION"]){
                  $dump.="<tr><td>Название выставки {$_REQUEST["NAME_EXHIBITION"]}</td></tr>";
            }
            if($_REQUEST["TIME"]){
                  $dump.="<tr><td>Время проведения  {$_REQUEST["TIME"]}</td></tr>";
            }
            
                
            if($plan)
                $dump.="<tr><td>План: <a href='{$_SERVER['SERVER_NAME']}{$plan}'>Скачать</a></td></tr>";
            else  $dump.="<tr><td>План: -</td></tr>";
            
            if($_REQUEST["NUMBER_PLAN"]){
                  $dump.="<tr><td>Номер места на плане {$_REQUEST["NUMBER_PLAN"]}</td></tr>";
            } 
            if($_REQUEST["MATERIAL"]){
                  $dump.="<tr><td>Материал напольного покрытия  {$_REQUEST["MATERIAL"]}</td></tr>";
            } 
            if($_REQUEST["NASTIL"]){
                  $dump.="<tr><td>Настил {$_REQUEST["NASTIL"]}</td></tr>";
            }
            if($_REQUEST["FLOOR"]){
                  $dump.="<tr><td>Этажность {$_REQUEST["FLOOR"]}</td></tr>";
            }
           /* if($_REQUEST["MEETING_ROOM"]){
                  $dump.="<tr><td>Переговорные комнаты {$_REQUEST["MEETING_ROOM"]}</td></tr>";
            }  */
            if($_REQUEST["MEETING_ROOM"]){
                if($_REQUEST["COL1"])
                    $COL1 = "Кол-во, шт.: {$_REQUEST["COL1"]}";
                else
                    $COL1 = "";
                if($_REQUEST["PL1"])
                    $PL1 = "примерная площадь, кв.м.: {$_REQUEST["PL1"]}";
                else
                    $PL1 = "";
                  $dump.="<tr><td>Переговорные комнаты {$_REQUEST["MEETING_ROOM"]}<div style='padding-left:20px;';> {$COL1} {$PL1}</div></td></tr>";
            }
            if($_REQUEST["UTILITY_ROOM"]){
                if($_REQUEST["COL"])
                    $COL = "Кол-во, шт.: {$_REQUEST["COL"]}";
                else
                    $COL = "";
                if($_REQUEST["PL"])
                    $PL = "примерная площадь, кв.м.: {$_REQUEST["PL"]}";
                else
                    $PL = "";
                  $dump.="<tr><td>Подсобное помещение  {$_REQUEST["UTILITY_ROOM"]}<div style='padding-left:20px;';> {$COL} {$PL}</div></td></tr>";
            }
            if($_REQUEST["WISHES"]){
                  $dump.="<tr><td>Дополнительные пожелания {$_REQUEST["WISHES"]}</td></tr>";
            }
            
            $dump.="<tr><td><h2>Наполнение стенда</h2></td></tr>";
            if($_REQUEST["INFO_STAND"]){
                $dump_temp = "";
                if($_REQUEST["INFO_STAND_MAT"]){
                    //echo"<pre>";var_dump($_REQUEST["INFO_STAND_MAT"]);echo"</pre>";
                    foreach ($_REQUEST["INFO_STAND_MAT"] as $key => $value) {
                       $dump_temp .= "<br> <div style='padding-left:20px;';>{$value}<br>Кол-во чел. за стойкой: {$_REQUEST["INFO_STAND_CHEL"][$key]} <br>Кол-во, шт.: {$_REQUEST["INFO_STAND_NUM"][$key]}</div>";
                    }
                    
                } 
                $dump.="<tr><td>Информационные стойки {$_REQUEST["NASTIL"]} {$dump_temp}</td></tr>";
            } 
            $dump.="<tr><td><h2>Наполнение стенда</h2></td></tr>";
            if($_REQUEST["SHOWCASE"]){
                $dump_temp = "";
                switch ($_REQUEST["SHOWCASE_MAT"]) {
                   case 1:
                     $SHOWCASE_MAT = "Витрина из конструктива";
                     break;
                   case 2:
                      $SHOWCASE_MAT= "ксклюзивная витрина (МДФ, ДСП, стекло, покраска)";
                     break;
                   case 3:
                     $SHOWCASE_MAT= "Покупная витрина";
                     break;
                }
                if($_REQUEST["SHOWCASE_MAT"]=="1"){
                   // echo"<pre>";var_dump($_REQUEST["INFO_STAND_MAT"]);echo"</pre>";
                    foreach ($_REQUEST["INFO_STAND_MAT"] as $key => $value) {
                       $dump_temp .= "<br> <div style='padding-left:20px;';>{$SHOWCASE_MAT} <br>{$_REQUEST["SHOWCASE_K1"][$key]} <br>{$_REQUEST["SHOWCASE_K2"][$key]} <br>{$_REQUEST["SHOWCASE_K3"][$key]}</div>";
                    }
                    
                } 
                 if($_REQUEST["SHOWCASE_MAT"]=="2"){
                    //echo"<pre>";var_dump($_REQUEST["INFO_STAND_MAT"]);echo"</pre>";
                    foreach ($_REQUEST["INFO_STAND_MAT"] as $key => $value) {
                       $dump_temp .= "<br> <div style='padding-left:20px;';>{$SHOWCASE_MAT} <br>Кол-во, шт. {$_REQUEST["SHOWCASE_E1"][$key]} <br>Площадь, кв.м. {$_REQUEST["SHOWCASE_E2"][$key]} <br>Количество полок, шт. {$_REQUEST["SHOWCASE_E3"][$key]}</div>";
                    }
                    
                }
                if($_REQUEST["SHOWCASE_MAT"]=="2"){
                    //echo"<pre>";var_dump($_REQUEST["INFO_STAND_MAT"]);echo"</pre>";
                    foreach ($_REQUEST["INFO_STAND_MAT"] as $key => $value) {
                       $dump_temp .= "<br> <div style='padding-left:20px;';>{$SHOWCASE_MAT} <br>Кол-во, шт. {$_REQUEST["SHOWCASE_P1"][$key]}</div>";
                    }
                    
                } 
                
                $dump.="<tr><td>Витрины {$_REQUEST["SHOWCASE"]} {$dump_temp}</td></tr>";
            }
            if($_REQUEST["SHALVES"]){
                $dump_temp = " <div style='padding-left:20px;';>";
                
                
                    //echo"<pre>";var_dump($_REQUEST["INFO_STAND_MAT"]);echo"</pre>";
                    foreach ($_REQUEST["SHALVES_MAT"] as $key => $value) {
                       $dump_temp .= "<br> {$value} Кол-во, шт. {$_REQUEST["SHALVES_K"][$key]}";
                    }
                    
                     $dump_temp.="</div>";
                
                $dump.="<tr><td>Полки {$_REQUEST["SHALVES"]} {$dump_temp}</td></tr>";
            }
            if($_REQUEST["RACKS"]){
               $dump_temp = " <div style='padding-left:20px;';>";
                
                
                    //echo"<pre>";var_dump($_REQUEST["INFO_STAND_MAT"]);echo"</pre>";
                    foreach ($_REQUEST["RACKS_MAT"] as $key => $value) {
                       $dump_temp .= "<br> <div style='padding-left:20px;';>{$value} <br>Кол-во, шт. {$_REQUEST["RACKS_K"][$key]}</div>";
                    }
                    $dump_temp.="</div>";
                 
                
                $dump.="<tr><td>Стеллажи {$_REQUEST["RACKS"]} {$dump_temp}</td></tr>";
            }
            if($_REQUEST["RACKS"]){
                $dump_temp = " <div style='padding-left:20px;';>";
                
                
                    //echo"<pre>";var_dump($_REQUEST["INFO_STAND_MAT"]);echo"</pre>";
                    foreach ($_REQUEST["EQIP_MAT"] as $key => $value) {
                       $dump_temp .= "<br> {$value} Кол-во, шт. {$_REQUEST["EQIP_K"][$key]}";
                    }
                    $dump_temp.="</div>";
                 
                
                $dump.="<tr><td>Оборудование {$_REQUEST["EQIP"]} {$dump_temp}</td></tr>";
            }
            if($_REQUEST["WISHES_2"]){
                  $dump.="<tr><td>Дополнительные пожелания {$_REQUEST["WISHES_2"]}</td></tr>";
            } 
             $dump.="<tr><td><h2>Наполнение мебелью помещений или открытых зон</h2></td></tr>";
             
            if($_REQUEST["CLOSE_MEETING"]){
                $dump_temp = " <div style='padding-left:20px;';>";
                
                
                    //echo"<pre>";var_dump($_REQUEST["INFO_STAND_MAT"]);echo"</pre>";
                    foreach ($_REQUEST["CLOSE_MEETING_TABLE"] as $key => $value) {
                       $dump_temp .= "<br>{$value} Кол-во, шт. {$_REQUEST["CLOSE_MEETING_TK"][$key]}";
                    }
                    foreach ($_REQUEST["CLOSE_MEETING_CHAIR"] as $key => $value) {
                       $dump_temp .= "<br>{$value} Кол-во, шт. {$_REQUEST["CLOSE_MEETING_CK"][$key]}";
                    }
                    $dump_temp .= " </div>";
                 
                
                $dump.="<tr><td>Закрытая переговорная {$_REQUEST["CLOSE_MEETING"]} {$dump_temp}</td></tr>";
            }
            if($_REQUEST["OPEN_MEETING"]){
                $dump_temp = " <div style='padding-left:20px;';>";
                
                
                    //echo"<pre>";var_dump($_REQUEST["INFO_STAND_MAT"]);echo"</pre>";
                    foreach ($_REQUEST["OPEN_MEETING_TABLE"] as $key => $value) {
                       $dump_temp .= "<br>{$value} Кол-во, шт. {$_REQUEST["OPEN_MEETING_TK"][$key]}";
                    }
                    foreach ($_REQUEST["OPEN_MEETING_CHEIR"] as $key => $value) {
                       $dump_temp .= "<br>{$value} Кол-во, шт. {$_REQUEST["OPEN_MEETING_CK"][$key]}";
                    }
                    $dump_temp .= " </div>";
                 
                
                $dump.="<tr><td>Открытая переговорная {$_REQUEST["OPEN_MEETING"]} {$dump_temp}</td></tr>";
            }
            if($_REQUEST["KITCHEN"]){
                $dump_temp = " <div style='padding-left:20px;';>";
                
                
                    //echo"<pre>";var_dump($_REQUEST["INFO_STAND_MAT"]);echo"</pre>";
                    foreach ($_REQUEST["KITCHEN_TABLE"] as $key => $value) {
                       $dump_temp .= "<br>{$value} <br>Кол-во, шт. {$_REQUEST["OPEN_MEETING_TK"][$key]}";
                    }
                    foreach ($_REQUEST["KITCHEN_CHAIR"] as $key => $value) {
                       $dump_temp .= "<br>{$value} <br>Кол-во, шт. {$_REQUEST["KITCHEN_CK"][$key]}";
                    }
                    $dump_temp .= " </div>";
                 
                
                $dump.="<tr><td>Кухня {$_REQUEST["KITCHEN"]} {$dump_temp}</td></tr>";
            }
            if($_REQUEST["UTILITY_ROOM_2"]){
                $dump_temp = " <div style='padding-left:20px;';>";
                
                
                    //echo"<pre>";var_dump($_REQUEST["INFO_STAND_MAT"]);echo"</pre>";
                    foreach ($_REQUEST["UTILITY_ROOM_2_T"] as $key => $value) {
                       $dump_temp .= "<br>{$value} Кол-во, шт. {$_REQUEST["UTILITY_ROOM_2_TK"][$key]}";
                    }
                    foreach ($_REQUEST["UTILITY_ROOM_2_C"] as $key => $value) {
                       $dump_temp .= "<br>{$value} Кол-во, шт. {$_REQUEST["UTILITY_ROOM_2_CK"][$key]}";
                    }
                     $dump_temp .= " </div>";
                 
                
                $dump.="<tr><td>Подсобное помещение {$_REQUEST["UTILITY_ROOM_2"]} {$dump_temp}</td></tr>";
            }
            if($_REQUEST["WISHES_3"]){
                  $dump.="<tr><td>Дополнительные пожелания {$_REQUEST["WISHES_3"]}</td></tr>";
            } 
            
            $dump.="<tr><td><h2>Художественное оформление</h2></td></tr>";
            
            
            if($logo)
                $dump.="<tr><td>Логотип: <a href='{$_SERVER['SERVER_NAME']}{$logo}'>Скачать</a></td></tr>";
            else  $dump.="<tr><td>План: -</td></tr>";
            
            if($_REQUEST["SLOGAN"]){
                  $dump.="<tr><td>Слоган, надписи {$_REQUEST["SLOGAN"]}</td></tr>";
            }
            if($_REQUEST["COLOR"]){
                  $dump.="<tr><td>Цветовая гамма стенда {$_REQUEST["COLOR"]}</td></tr>";
            }
            
            if($banner)
                $dump.="<tr><td>Баннеры: <a href='{$_SERVER['SERVER_NAME']}{$banner}'>Скачать</a></td></tr>";
            else  $dump.="<tr><td>План: -</td></tr>";
           
            if($_REQUEST["WISHES_4"]){
                  $dump.="<tr><td>Дополнительные пожелания {$_REQUEST["WISHES_4"]}</td></tr>";
            } 
            if($_REQUEST["BUD"]){
                  $dump.="<tr><td>Ориентировочный бюджет {$_REQUEST["BUD"]}</td></tr>";
            } 
            if($_REQUEST["DATE_S"]){
                  $dump.="<tr><td>Ориентировочная дата сдачи проекта {$_REQUEST["DATE_S"]}</td></tr>";
            }
            $dump.= "</table>";
           // echo $dump; 
            
            
            ##################################
            if($PRODUCT_ID){
                if(!$_REQUEST["COMPANY"]) $_REQUEST["COMPANY"] = "Неизвестная компания";
                $arLoadProductArray = Array(
                 
                  "NAME"           => $_REQUEST["COMPANY"],
                  "ACTIVE"         => "Y",            // активен
                  "DETAIL_TEXT"    => $dump,
                  );

               
                $res = $el->Update($PRODUCT_ID, $arLoadProductArray);   
            }else{
                $el = new CIBlockElement;
                 

                if(!$_REQUEST["COMPANY"]) $_REQUEST["COMPANY"] = "Неизвестная компания";
                $arLoadProductArray = Array(
                  
                  "IBLOCK_ID"      => 11,
                  
                  "NAME"           => $_REQUEST["COMPANY"],
                  "ACTIVE"         => "Y",            // активен
                  "DETAIL_TEXT"    => $dump,
                  );

                $PRODUCT_ID = $el->Add($arLoadProductArray);
                
            }
            ###################################
            $strEmail = COption::GetOptionString('main','email_from');
            $arEventFields = array(
                
                "MESSAGE"             => $dump,
                "COMPANY" =>$_REQUEST["COMPANY"],
                "EMAIL2" =>$_REQUEST["EMAIL"]
               
                );
            //$arrSITE =  CAdvContract::GetSiteArray($CONTRACT_ID);
            CEvent::Send("NEW_ORDER", SITE_ID, $arEventFields, "N", 25);
            if($PRODUCT_ID) echo"<span style='color:red;'><h2>Спасибо за обращение. Мы свяжемся с Вами в ближайшее время!</h2></span>";
            
        }else{ //капча 
            $captha = false;
        
        }   
    }
?>

<!--Для Datepicker полей-->
<link href="<?=SITE_TEMPLATE_PATH?>/css/jquery.datetimepicker.css" rel="stylesheet">
<script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/js/jquery.datetimepicker.js"></script>
<script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/js/jquery.idTabs.min.js"></script>
<script>
$(document).ready(function(){
	$('.date-input').datetimepicker({format:'d.m.Y H:i', lang:'ru', mask:true});
});
</script>

 <h1>Заказать стенд</h1>
            
            
            <div class="stand-form">
            
                <p>Данный раздел включает в себя набор элементарных вопросов, которые дадут нам достаточно информации для предварительной оценки и дальнейшей работы.</p>
                
                <h3>Оставьте заявку и наши менеджеры свяжутся с Вами для уточнения подробностей</h3>
                
                <hr>
                
                <h2>Информация о Заказчике</h2>
                
                <form method="post" enctype="multipart/form-data" class="rf">
                    <p> <span class="required">*</span> - Обязательные для заполнения поля </p>
                    
                    <div class="triple-fieldset">
                        
                        <fieldset>
                            <div class="caption">Контактное лицо <span class="required">*</span></div>
                            <input type="text" name="CONTACT_FACE" class="w-text rfield" value="<?=$_REQUEST["CONTACT_FACE"]?>">
                        </fieldset>
                        
                        <fieldset>
                            <div class="caption">Телефон/факс <span class="required">*</span></div>
                            <input type="text" name="PHONE" class="w-text rfield" value="<?=$_REQUEST["PHONE"]?>">
                        </fieldset>
                        
                        <fieldset>
                            <div class="caption">E-mail <span class="required">*</span></div>
                            <input type="text" name="EMAIL" id="EMAIL33" class="w-text rfield" value="<?=$_REQUEST["EMAIL"]?>">
                        </fieldset>
                    </div><!--.triple-fieldset-->
                    
                    
                    <div class="triple-fieldset">
                        <fieldset>
                            <div class="caption">Компания <span class="required">*</span></div>
                            <input type="text" name="COMPANY" class="w-text rfield" value="<?=$_REQUEST["COMPANY"]?>">
                        </fieldset>
                        
                        <fieldset>
                            <div class="caption">Сайт</div>
                            <input type="text" site="SITE" class="w-text" value="<?=$_REQUEST["SITE"]?>">
                        </fieldset>
                    </div><!--.triple-fieldset-->
                    
                    <fieldset>
                        <div class="caption">Название выставки <span class="required">*</span></div>
                        <input type="text" name="NAME_EXHIBITION" class="w-text rfield" value="<?=$_REQUEST["NAME_EXHIBITION"]?>">
                    </fieldset>
                    
                    <div class="triple-fieldset">
                        <fieldset>
                            <div class="caption">Время проведения <span class="required">*</span></div>
                            <input type="text" name="TIME" class="w-text rfield date-input" value="<?=$_REQUEST["TIME"]?>">
                        </fieldset>
                        
                        <fieldset>
                            <div class="caption">Прикрепить планировку зала</div>
                            <div class="file-input-box">
                                <input readonly class="file-input-text" id="hall-plan-text" onclick="$('#hall-plan-file').click()">
                                <input id="hall-plan-file" type="file" name="PLAN" onchange="$('#hall-plan-text').val(this.value)"  class="file-input">
                            </div>
                            <div class="form-note">*.jpg"; "*.cdr"; "*ai"; ".pdf"; "*.rar"; "*.zip"</div>
                        </fieldset> 
                                                                  
                        <fieldset>
                            <div class="caption">Номер места на плане</div>
                            <input type="text" name="NUMBER_PLAN" class="w-text" value="<?=$_REQUEST["NUMBER_PLAN"]?>">
                        </fieldset>
                    </div><!--.triple-fieldset-->
                    
                    
                    <hr>
                    
                    
                    
                    <h3>Более подробная информация о заказе <span style="text-transform:lowercase">(к заполнению по желанию)</span>:</h3>
                    
                    <div class="idTabs order-tabs clearfix">
                        <a href="#tab-requirements">Кострукция</a>
                        <a href="#tab-content">Наполнение</a>
                        <a href="#tab-furniture">Мебель</a>
                        <a href="#tab-decoration">Художественное оформление</a>
                    </div>
                    
                    
                    
                    
                    <div id="tab-requirements" class="order-tab">
                        
                        <h2>Требования к стенду</h2>
                        
                        <div class="double-fieldset">
                            <fieldset>
                                <div class="caption">Материал напольного покрытия </div>
                                <select name="MATERIAL" data-placeholder="Выберите материал покрытия" class="chosen-select">
                                    <option value=""></option>
                                    <option value="Ковролин" <?if($_REQUEST["MATERIAL"]=="Ковролин") echo"selected";?>>Ковролин</option>
                                    <option value="Ламинат" <?if($_REQUEST["MATERIAL"]=="Ламинат") echo"selected";?>>Ламинат</option>
                                    <option value="Материал 3" <?if($_REQUEST["MATERIAL"]=="Материал 3") echo"selected";?>>Материал 3</option>
                                    <option value="Материал 4" <?if($_REQUEST["MATERIAL"]=="Материал 4") echo"selected";?>>Материал 4</option>
                                    
                                </select>
                            </fieldset>
                            
                            <fieldset>
                                <div class="caption">Настил </div>
                                <select name="NASTIL" data-placeholder="Выберите настил" class="chosen-select">
                                    <option value=""></option>
                                    <option value="настил 32мм">настил 32мм</option>
                                    <option value="подиум 100мм">подиум 100мм</option>
                                    <option value="подиум 100мм+подсветка по краю">подиум 100мм+подсветка по краю</option>
                                    <option value="Материал настила 4">Материал настила 4</option>
                                    <option value="Материал настила 5">Материал настила 5</option>
                                    <option value="другое">другое</option>
                                </select>
                            </fieldset>
                        </div><!--.double-fieldset-->
                        
                        <div class="double-fieldset">
                            <fieldset>
                                <div class="caption">Этажность </div>
                                <select name="FLOOR" data-placeholder="Выберите" class="chosen-select">
                                     <option value=""></option>
                                     <option value="1 этаж" selected>1 этаж</option>
                                     <option value="2 этажа">2 этажа</option>
                                </select>
                            </fieldset>
                            
                            <fieldset>
                                <div class="caption">Переговорные комнаты </div>
                                <select name="MEETING_ROOM" data-placeholder="Выберите" class="chosen-select yes-or-not">
                                    <option value=""></option>
                                    <option value="Нет" selected>не требуется</option>
                                    <option value="Да">требуется</option>
                                </select>
                                <div class="f-hidden">
                                    <div class="f-additional clearfix">
                                        <div class="fl-left">
                                            <div class="caption-small">Кол-во, шт.:</div>
                                            <input type="text" name="COL1" value="" class="w-text width-small" maxlength="4">
                                        </div>
                                        <div class="fl-right">
                                            <div class="caption-small">примерная площадь, кв.м.:</div>
                                            <input type="text" name="PL1" value="" class="w-text width-small" maxlength="4">
                                        </div>
                                    </div>                                            
                                </div>
                            </fieldset>
                        </div><!--.double-fieldset-->
                        
                        <div class="double-fieldset">
                            <fieldset>
                                <div class="caption">Подсобные помещения </div>
                                <select name="UTILITY_ROOM" data-placeholder="Выберите" class="chosen-select width-half yes-or-not">
                                    <option value=""></option>
                                    <option value="Нет" selected>не требуется</option>
                                    <option value="Да">требуется</option>
                                </select>
                                <div class="f-hidden">
                                    <div class="f-additional clearfix">
                                        <div class="fl-left">
                                            <div class="caption-small">Кол-во, шт.:</div>
                                            <input type="text" name="COL" value="" class="w-text width-small" maxlength="4">
                                        </div>
                                        <div class="fl-right">
                                            <div class="caption-small">примерная площадь, кв.м.:</div>
                                            <input type="text" name="PL" value="" class="w-text width-small" maxlength="4">
                                        </div>
                                    </div>                                            
                                </div>
                            </fieldset>
                        </div><!--.double-fieldset-->
                        
                        <fieldset>
                            <div class="caption">Дополнительные пожелания</div>
                            <textarea name="WISHES" class="w-textarea"></textarea>
                        </fieldset>
                        
                    </div><!--#tab-requirements-->
                    
                    
                    
                    
                    <div id="tab-content" class="order-tab">
                        
                        <h2>Наполнение стенда</h2>
                        
                        <div class="double-fieldset">
                            <fieldset>
                                <div class="caption">Информационные стойки</div>
                                <select name="INFO_STAND" data-placeholder="Выберите" class="chosen-select yes-or-not">
                                    <option value=""></option>
                                    <option value="Нет" selected>не требуется</option>
                                    <option value="Да">требуется</option>
                                </select>
                                <div class="f-hidden">
                                    <div class="f-additional clearfix">
                                        <span class="f-delete" title="Удалить"></span>
                                        <select name="INFO_STAND_MAT[]" data-placeholder="Выберите" class="chosen-select">
                                            <option value=""></option>
                                            <option value="Стойка из конструктива" selected>Стойка из конструктива</option>
                                            <option value="Эксклюзивная стойка (МДФ, ДСП, стекло, покраска)">Эксклюзивная стойка (МДФ, ДСП, стекло, покраска)</option>
                                        </select>
                                        <div class="fl-left">
                                            <div class="caption-small">Кол-во чел. за стойкой:</div>
                                            <input type="text" name="INFO_STAND_CHEL[]" value="" class="w-text width-small" maxlength="4">
                                        </div>
                                        <div class="fl-right">
                                            <div class="caption-small">Кол-во, шт.:</div>
                                            <input type="text" name="INFO_STAND_NUM[]" value="" class="w-text width-small" maxlength="4">
                                        </div>
                                    </div>
                                    <span href="#" class="f-add">Добавить</span>                                            
                                </div>
                            </fieldset>
                            
                            <fieldset>
                                <div class="caption">Витрины </div>
                                <select name="SHOWCASE" data-placeholder="Выберите" class="chosen-select yes-or-not">
                                    <option value=""></option>
                                    <option value="Нет" selected>не требуется</option>
                                    <option value="Да">требуется</option>
                                </select>
                                <div class="f-hidden">
                                    <div class="f-additional clearfix">
                                        <span class="f-delete" title="Удалить"></span>
                                        <select name="SHOWCASE_MAT" data-placeholder="Выберите" class="chosen-select f-switch">
                                            <option value=""></option>
                                            <option value="1" selected>Витрина из конструктива</option>
                                            <option value="2">Эксклюзивная витрина (МДФ, ДСП, стекло, покраска)</option>
                                            <option value="3">Покупная витрина</option>
                                        </select>
                                        <div class="f-switch f-switch-1">
                                            <select name="SHOWCASE_K1[]" class="chosen-select width-half">
                                                <option value="Высокая">Высокая</option>
                                                <option value="Низкая">Низкая</option>
                                            </select>
                                            <select name="SHOWCASE_K2[]" class="chosen-select width-half">
                                                <option value="С подсветкой">С подсветкой</option>
                                                <option value="Без подсветки">Без подсветки</option>
                                            </select>
                                            <select name="SHOWCASE_K3[]" class="chosen-select width-half">
                                                <option value="Прямоугольная">Прямоугольная</option>
                                                <option value="Квадратная">Квадратная</option>
                                                <option value="Радиусная">Радиусная</option>
                                            </select>
                                        </div>
                                        <div class="f-switch f-switch-2" style="display:none;">
                                            <div class="f-line">
                                                <div class="caption-small">Кол-во, шт.</div>
                                                <input type="text" name="SHOWCASE_E1[]" value="" class="w-text width-small" maxlength="4">
                                            </div>
                                            <div class="f-line">
                                                <div class="caption-small">Площадь, кв.м.</div>
                                                <input type="text" name="SHOWCASE_E2[]" value="" class="w-text width-small" maxlength="4">
                                            </div>
                                            <div class="f-line">
                                                <div class="caption-small">Количество полок, шт.</div>
                                                <input type="text" name="SHOWCASE_E3[]" value="" class="w-text width-small" maxlength="4">
                                            </div>
                                        </div>
                                        <div class="f-switch f-switch-3" style="display:none;">
                                            <div class="f-line">
                                                Кол-во, шт.: 
                                                <input type="text" name="SHOWCASE_P1[]" value="" class="w-text width-small" maxlength="4">
                                                <div class="form-note">Покупные витрины обсуждаются с заказчиком</div>
                                            </div>
                                        </div>
                                    </div>
                                    <span href="#" class="f-add">Добавить</span> 
                                </div>
                            </fieldset>
                        </div><!--.double-fieldset-->
                        
                        
                        <div class="double-fieldset">
                            <fieldset>
                                <div class="caption">Полки </div>
                                <select name="SHALVES" data-placeholder="Выберите" class="chosen-select yes-or-not">
                                    <option value=""></option>
                                    <option value="Нет" selected>не требуется</option>
                                    <option value="Да">требуется</option>
                                </select>
                                <div class="f-hidden">
                                    <div class="f-additional clearfix">
                                        <span class="f-delete" title="Удалить"></span>
                                        <select name="SHALVES_MAT[]" data-placeholder="Выберите" class="chosen-select">
                                            <option value=""></option>
                                            <option value="Стандартная полка 1000мм х 300мм" selected>Стандартная полка 1000мм х 300мм</option>
                                            <option value="Эксклюзивная полка (МДФ, ДСП, стекло, покраска)">Эксклюзивная полка (МДФ, ДСП, стекло, покраска)</option>
                                        </select>
                                        <div class="f-line">
                                            <div class="caption-small">Кол-во, шт.:</div>
                                            <input type="text" name="SHALVES_K[]" value="" class="w-text width-small" maxlength="4">
                                        </div>
                                    </div>
                                    <span href="#" class="f-add">Добавить</span>                                            
                                </div>
                            </fieldset>
                            
                            <fieldset>
                                <div class="caption">Стеллажи </div>
                                <select name="RACKS" data-placeholder="Выберите" class="chosen-select width-half yes-or-not">
                                    <option value=""></option>
                                    <option value="Нет" selected>не требуется</option>
                                    <option value="Да">требуется</option>
                                </select>
                                <div class="f-hidden">
                                    <div class="f-additional clearfix">
                                        <span class="f-delete" title="Удалить"></span>
                                        <select name="RACKS_MAT[]" data-placeholder="Выберите" class="chosen-select">
                                            <option value=""></option>
                                            <option value="Стеллаж из пяти полок 300*1000*2500" selected>Стеллаж из пяти полок 300*1000*2500</option>
                                            <option value="Стеллаж из пяти полок 500*1000*2500">Стеллаж из пяти полок 500*1000*2500</option>
                                            <option value="Стеллаж из пяти полок 500*500*2500">Стеллаж из пяти полок 500*500*2500</option>
                                            <option value="Стеллаж из пяти полок 1000*1000*2500">Стеллаж из пяти полок 1000*1000*2500</option>
                                        </select>
                                        <div class="f-line">
                                            <div class="caption-small">Кол-во, шт.:</div>
                                            <input type="text" name="RACKS_K[]" value="" class="w-text width-small" maxlength="4">
                                        </div>
                                    </div>
                                    <span href="#" class="f-add">Добавить</span>                                            
                                </div>
                            </fieldset>
                        </div><!--.double-fieldset-->
                        
                        
                        <div class="double-fieldset">
                            <fieldset>
                                <div class="caption">Оборудование </div>
                                <select name="EQIP" data-placeholder="Выберите" class="chosen-select width-half yes-or-not">
                                    <option value=""></option>
                                    <option value="0" selected>не требуется</option>
                                    <option value="1">требуется</option>
                                </select>
                                <div class="f-hidden">
                                    <div class="f-additional clearfix">
                                        <span class="f-delete" title="Удалить"></span>
                                        <select name="EQIP_MAT[]" data-placeholder="Выберите" class="chosen-select">
                                            <option value=""></option>
                                            <option value="Монитор (samsung 19")" selected>Монитор (samsung 19")</option>
                                            <option value="Плазменная панель 42">Плазменная панель 42"</option>
                                            <option value="Плазменная панель 50">Плазменная панель 50"</option>
                                            <option value="Плазменная панель 60">Плазменная панель 60"</option>
                                            <option value="DVD">DVD</option>
                                        </select>
                                        <div class="f-line">
                                            <div class="caption-small">Кол-во, шт.:</div>
                                            <input type="text" name="EQIP_K[]" value="" class="w-text width-small" maxlength="4">
                                        </div>
                                    </div>
                                    <span href="#" class="f-add">Добавить</span>                                            
                                </div>
                            </fieldset>
                        </div><!--.double-fieldset-->
                        
                        <fieldset>
                            <div class="caption">Дополнительные пожелания</div>
                            <textarea name="WISHES_2" class="w-textarea"></textarea>
                        </fieldset>
                    
                    </div><!--#tab-content-->
                    
                    
                    
                    <div id="tab-furniture" class="order-tab">
                        
                        <h2>Наполнение мебелью помещений или открытых зон</h2>
                        
                        <div class="double-fieldset">
                            <fieldset>
                                <div class="caption">Закрытая переговорная </div>
                                <select name="CLOSE_MEETING" data-placeholder="Выберите" class="chosen-select yes-or-not">
                                    <option value=""></option>
                                    <option value="Нет" selected>не требуется</option>
                                    <option value="Да">требуется</option>
                                </select>
                                <div class="f-hidden">
                                    <div class="f-additional clearfix">
                                        <span class="f-delete" title="Удалить"></span>
                                        <select name="CLOSE_MEETING_TABLE[]" data-placeholder="Выберите" class="chosen-select">
                                            <option value=""></option>
                                            <option value="Стол стеклянный d800" selected>Стол стеклянный d800</option>
                                            <option value="Стол 800*800">Стол 800*800</option>
                                            <option value="Стол 700х1100">Стол 700х1100</option>
                                            <option value="Стол d700">Стол d700</option>
                                            <option value="Стол барный d800">Стол барный d800</option>
                                            <option value="Стол стеклянный журнальный (овальный) 600*1000">Стол стеклянный журнальный (овальный) 600*1000</option>
                                            <option value="Покупной стол">Покупной стол</option>
                                        </select>
                                        <div class="f-line">
                                            <div class="caption-small">Кол-во, шт.:</div>
                                            <input type="text" name="CLOSE_MEETING_TK[]" value="" class="w-text width-small" maxlength="4">
                                        </div>
                                    </div>
                                    <span href="#" class="f-add">Добавить</span>
                                    
                                    <div class="f-additional clearfix">
                                        <span class="f-delete" title="Удалить"></span>
                                        <select name="CLOSE_MEETING_CHAIR[]" data-placeholder="Выберите" class="chosen-select">
                                            <option value=""></option>
                                            <option value="Стул мягкий" selected>Стул мягкий</option>
                                            <option value="Стул «Икеа»">Стул «Икеа»</option>
                                            <option value="Стул барный">Стул барный</option>
                                            <option value="Кресло одноместное">Кресло одноместное</option>
                                            <option value="Диван двухмесный">Диван двухмесный</option>
                                            <option value="Покупной стул">Покупной стул</option>
                                        </select>
                                        <div class="f-line">
                                            <div class="caption-small">Кол-во, шт.:</div>
                                            <input type="text" name="CLOSE_MEETING_CK[]" value="" class="w-text width-small" maxlength="4">
                                        </div>
                                    </div>
                                    <span href="#" class="f-add">Добавить</span>
                                </div>
                            </fieldset>
                            
                            <fieldset>
                                <div class="caption">Открытая переговорная </div>
                                <select name="OPEN_MEETING" data-placeholder="Выберите" class="chosen-select yes-or-not">
                                    <option value=""></option>
                                    <option value="Нет" selected>не требуется</option>
                                    <option value="Да">требуется</option>
                                </select>
                                <div class="f-hidden">
                                    <div class="f-additional clearfix">
                                        <span class="f-delete" title="Удалить"></span>
                                        <select name="OPEN_MEETING_TABLE[]" data-placeholder="Выберите" class="chosen-select">
                                            <option value=""></option>
                                            <option value="Стол стеклянный d800" selected>Стол стеклянный d800</option>
                                            <option value="Стол 800*800">Стол 800*800</option>
                                            <option value="Стол 700х1100">Стол 700х1100</option>
                                            <option value="Стол d700">Стол d700</option>
                                            <option value="Стол барный d800">Стол барный d800</option>
                                            <option value="Стол стеклянный журнальный (овальный) 600*1000">Стол стеклянный журнальный (овальный) 600*1000</option>
                                            <option value="Покупной стол">Покупной стол</option>
                                        </select>
                                        <div class="f-line">
                                            <div class="caption-small">Кол-во, шт.:</div>
                                            <input type="text" name="OPEN_MEETING_TK[]" value="" class="w-text width-small" maxlength="4">
                                        </div>
                                    </div>
                                    <span href="#" class="f-add">Добавить</span>
                                    
                                    <div class="f-additional clearfix">
                                        <span class="f-delete" title="Удалить"></span>
                                        <select name="OPEN_MEETING_CHAIR[]" data-placeholder="Выберите" class="chosen-select">
                                            <option value=""></option>
                                            <option value="Стул мягкий" selected>Стул мягкий</option>
                                            <option value="Стул «Икеа»">Стул «Икеа»</option>
                                            <option value="Стул барный">Стул барный</option>
                                            <option value="Кресло одноместное">Кресло одноместное</option>
                                            <option value="Диван двухмесный">Диван двухмесный</option>
                                            <option value="Покупной стул">Покупной стул</option>
                                        </select>
                                        <div class="f-line">
                                            <div class="caption-small">Кол-во, шт.:</div>
                                            <input type="text" name="OPEN_MEETING_CK[]" value="" class="w-text width-small" maxlength="4">
                                        </div>
                                    </div>
                                    <span href="#" class="f-add">Добавить</span>                                         
                                </div>
                            </fieldset>
                        </div><!--.double-fieldset-->
                        
                        
                        <div class="double-fieldset">
                            <fieldset>
                                <div class="caption">Кухня </div>
                                <select name="KITCHEN" data-placeholder="Выберите" class="chosen-select yes-or-not">
                                    <option value=""></option>
                                    <option value="Нет" selected>не требуется</option>
                                    <option value="Да">требуется</option>
                                </select>
                                <div class="f-hidden">
                                    <div class="f-additional clearfix">
                                        <span class="f-delete" title="Удалить"></span>
                                        <select name="KITCHEN_TABLE[]" data-placeholder="Выберите" class="chosen-select">
                                            <option value=""></option>
                                            <option value="Стол стеклянный d800" selected>Стол стеклянный d800</option>
                                            <option value="Стол 800*800">Стол 800*800</option>
                                            <option value="Стол 700х1100">Стол 700х1100</option>
                                            <option value="Стол d700">Стол d700</option>
                                            <option value="Стол барный d800">Стол барный d800</option>
                                            <option value="Стол стеклянный журнальный (овальный) 600*1000">Стол стеклянный журнальный (овальный) 600*1000</option>
                                            <option value="Покупной стол">Покупной стол</option>
                                        </select>
                                        <div class="f-line">
                                            <div class="caption-small">Кол-во, шт.:</div>
                                            <input type="text" name="KITCHEN_TK[]" value="" class="w-text width-small" maxlength="4">
                                        </div>
                                    </div>
                                    <span href="#" class="f-add">Добавить</span>
                                    
                                    <div class="f-additional clearfix">
                                        <span class="f-delete" title="Удалить"></span>
                                        <select name="KITCHEN_CHAIR[]" data-placeholder="Выберите" class="chosen-select">
                                            <option value=""></option>
                                            <option value="Стул мягкий" selected>Стул мягкий</option>
                                            <option value="Стул «Икеа»">Стул «Икеа»</option>
                                            <option value="Стул барный">Стул барный</option>
                                            <option value="Кресло одноместное">Кресло одноместное</option>
                                            <option value="Диван двухмесный">Диван двухмесный</option>
                                            <option value="Покупной стул">Покупной стул</option>
                                        </select>
                                        <div class="f-line">
                                            <div class="caption-small">Кол-во, шт.:</div>
                                            <input type="text" name="KITCHEN_CK[]" value="" class="w-text width-small" maxlength="4">
                                        </div>
                                    </div>
                                    <span href="#" class="f-add">Добавить</span>                                         
                                </div>
                            </fieldset>
                            
                            <fieldset>
                                <div class="caption">Подсобное помещение </div>
                                <select name="UTILITY_ROOM_2" data-placeholder="Выберите" class="chosen-select yes-or-not">
                                    <option value=""></option>
                                    <option value="Нет" selected>не требуется</option>
                                    <option value="Да">требуется</option>
                                </select>
                                <div class="f-hidden">
                                    <div class="f-additional clearfix">
                                        <span class="f-delete" title="Удалить"></span>
                                        <select name="UTILITY_ROOM_2_T[]" data-placeholder="Выберите" class="chosen-select">
                                            <option value=""></option>
                                            <option value="Стол стеклянный d800" selected>Стол стеклянный d800</option>
                                            <option value="Стол 800*800">Стол 800*800</option>
                                            <option value="Стол 700х1100">Стол 700х1100</option>
                                            <option value="Стол d700">Стол d700</option>
                                            <option value="Стол барный d800">Стол барный d800</option>
                                            <option value="Стол стеклянный журнальный (овальный) 600*1000">Стол стеклянный журнальный (овальный) 600*1000</option>
                                            <option value="Покупной стол">Покупной стол</option>
                                        </select>
                                        <div class="f-line">
                                            <div class="caption-small">Кол-во, шт.:</div>
                                            <input type="text" name="UTILITY_ROOM_2_TK[]" value="" class="w-text width-small" maxlength="4">
                                        </div>
                                    </div>
                                    <span href="#" class="f-add">Добавить</span>
                                    
                                    <div class="f-additional clearfix">
                                        <span class="f-delete" title="Удалить"></span>
                                        <select name="UTILITY_ROOM_2_C[]" data-placeholder="Выберите" class="chosen-select">
                                            <option value=""></option>
                                            <option value=""></option>
                                            <option value="Стул мягкий" selected>Стул мягкий</option>
                                            <option value="Стул «Икеа»">Стул «Икеа»</option>
                                            <option value="Стул барный">Стул барный</option>
                                            <option value="Кресло одноместное">Кресло одноместное</option>
                                            <option value="Диван двухмесный">Диван двухмесный</option>
                                            <option value="Покупной стул">Покупной стул</option>
                                        </select>
                                        <div class="f-line">
                                            <div class="caption-small">Кол-во, шт.:</div>
                                            <input type="text" name="UTILITY_ROOM_2_CK[]" value="" class="w-text width-small" maxlength="4">
                                        </div>
                                    </div>
                                    <span href="#" class="f-add">Добавить</span>                                         
                                </div>
                            </fieldset>
                        </div><!--.double-fieldset-->
                        
                        <fieldset>
                            <div class="caption">Дополнительные пожелания</div>
                            <textarea name="WISHES_3" class="w-textarea"></textarea>
                        </fieldset>
                    
                    </div><!--#tab-furniture-->
                    
                    
                    
                    <div id="tab-decoration" class="order-tab">
                        
                        <h2>Художественное оформление</h2>
                        
                        <div class="double-fieldset">
                            <fieldset>
                                <div class="caption">Логотип</div>
                                <div class="file-input-box">
                                    <input readonly class="file-input-text" id="logo-text" onclick="$('#logo-file').click()">
                                    <input id="logo-file" type="file" onchange="$('#logo-text').val(this.value)" name="LOGO" class="file-input">
                                </div>
                                <div class="form-note">*.jpg"; "*.cdr"; "*ai"; ".pdf"; "*.rar"; "*.zip"</div>
                            </fieldset>
                            
                            <fieldset>
                                <div class="caption">Слоган, надписи</div>
                                <input name="SLOGAN" type="text" class="w-text">
                            </fieldset>
                        </div><!--.double-fieldset-->
                        
                        <div class="double-fieldset">
                            <fieldset>
                                <div class="caption">Цветовая гамма стенда</div>
                                <input name="COLOR" type="text" class="w-text">
                            </fieldset>
                            
                            <fieldset>
                                <div class="caption">Баннеры</div>
                                <div class="file-input-box">
                                    <input readonly class="file-input-text" id="banner-text" onclick="$('#banner-file').click()">
                                    <input id="banner-file" type="file" onchange="$('#banner-text').val(this.value)" name="BANNER" class="file-input">
                                </div>
                                <div class="form-note">*.jpg"; "*.cdr"; "*ai"; ".pdf"; "*.rar"; "*.zip"</div>
                            </fieldset>
                        </div><!--.double-fieldset-->
                        
                        <fieldset>
                            <div class="caption">Дополнительные пожелания</div>
                            <textarea name="WISHES_4" class="w-textarea"></textarea>
                        </fieldset>
                        
                    </div><!--#tab-decoration-->
                    
                    <hr>
                    
                    
                    <div class="double-fieldset">
                        <fieldset>
                            <div class="caption">Ориентировочный бюджет</div>
                            <input name="BUD" type="text" class="w-text" value="<?=$_REQUEST["BUD"]?>">
                        </fieldset>
                        
                        <fieldset>
                            <div class="caption">Ориентировочная дата сдачи проекта</div>
                            <input name="DATE_S" type="text" class="w-text" value="<?=$_REQUEST["DATE_S"]?>">
                        </fieldset>
                    </div><!--.double-fieldset-->
                    
                    <hr>
                    
                    
                    <div class="double-fieldset">
                        <fieldset>
                            <div class="caption">Введите код с картинки <span class="required">*</span><?if(!$captha){echo" <span style='color:red'>Не верно введен код!</span>";}?></div>
                            <input  name="captcha_word" type="text" class="w-text width-half  rfield">
                            <img src="/bitrix/tools/captcha.php?captcha_code=<?=htmlspecialchars($cpt->GetCodeCrypt());?>" class="captcha">
                            <input name="captcha_code" value="<?=htmlspecialchars($cpt->GetCodeCrypt());?>" type="hidden">
                            
                        </fieldset>
                        
                        <input type="submit" class="blue-btn fl-right" name="sendform" id="sendform" value="Отправить заказ">
                    </div><!--.double-fieldset-->
                    
                </form>
                
            </div><!--.stand-form-->
            

 </main><!-- .content -->

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>