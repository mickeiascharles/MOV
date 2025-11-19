*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${URL}            http://localhost:5173
${BROWSER}        chrome
${DELAY}          0.5s

*** Test Cases ***
Cenario: Login com Sucesso e Verificacao do Dashboard
    [Documentation]    Testa o fluxo principal de login e carregamento da home.
    Abrir Navegador
    Fazer Login
    Verificar Carregamento do Dashboard
    Verificar Se Mapa Existe
    [Teardown]    Close Browser

*** Keywords ***
Abrir Navegador
    Open Browser    ${URL}/login    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}

Fazer Login
    Wait Until Page Contains    Login    timeout=10s
    Input Text      xpath=//input[@type='email']       admin@mov.com
    Input Text      xpath=//input[@type='password']    123
    Click Button    xpath=//button[@type='submit']

Verificar Carregamento do Dashboard
    Wait Until Page Contains    Histórico de Eventos    timeout=10s
    Page Should Contain         Localizações com Eventos
    Page Should Contain         Detalhamento de Eventos

Verificar Se Mapa Existe
    Wait Until Element Is Visible    class=leaflet-container    timeout=5s
    Log    O mapa foi carregado corretamente.