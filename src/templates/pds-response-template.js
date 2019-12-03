export const generatePatientRetrievalResponse = (
  id,
  queryId,
  timestamp,
  receivingAsid,
  sendingAsid,
  nhsNumber,
  gpPracticeNumber
) =>
  `<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsa="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns="urn:hl7-org:v3">
    <SOAP-ENV:Header>
        <wsa:MessageID>uuid:${id}</wsa:MessageID>
        <wsa:Action>urn:nhs:names:services:pdsquery/QUPA_IN050000UK32</wsa:Action>
        <wsa:To/>
        <wsa:From>
            <wsa:Address>urn:nhs:names:services:pdsquery</wsa:Address>
        </wsa:From>
        <communicationFunctionRcv typeCode="RCV">
            <device classCode="DEV" determinerCode="INSTANCE">
                <id root="1.2.826.0.1285.0.2.0.107" extension="${receivingAsid}"/>
            </device>
        </communicationFunctionRcv>
        <communicationFunctionSnd typeCode="SND">
            <device classCode="DEV" determinerCode="INSTANCE">
                <id root="1.2.826.0.1285.0.2.0.107" extension="${sendingAsid}"/>
            </device>
        </communicationFunctionSnd>
        <wsa:RelatesTo>uuid:${queryId}</wsa:RelatesTo>
    </SOAP-ENV:Header>
    <SOAP-ENV:Body>
        <retrievalQueryResponse>
            <QUPA_IN050000UK32>
              <id root="${id}" />
              <creationTime value="${timestamp}" />
              <versionCode code="V3NPfIT3.0" />
              <interactionId root="2.16.840.1.113883.2.1.3.2.4.12" extension="QUPA_IN050000UK32" />
              <processingCode code="P" />
              <processingModeCode code="T" />
              <acceptAckCode code="NE" />
              <acknowledgement typeCode="AA">
                <messageRef>
                  <id root="${queryId}"/>
                </messageRef>
              </acknowledgement>
              <communicationFunctionRcv>
                <device classCode="DEV" determinerCode="INSTANCE">
                  <id root="1.2.826.0.1285.0.2.0.107" extension="${receivingAsid}"/>
                </device>
              </communicationFunctionRcv>
              <communicationFunctionSnd>
                <device classCode="DEV" determinerCode="INSTANCE">
                   <id root="1.2.826.0.1285.0.2.0.107" extension="${sendingAsid}"/>
                </device>
              </communicationFunctionSnd>
              <ControlActEvent classCode="CACT" moodCode="EVN">
                <author1 typeCode="AUT">
                  <AgentSystemSDS classCode="AGNT">
                    <agentSystemSDS classCode="DEV" determinerCode="INSTANCE">
                      <id root="1.2.826.0.1285.0.2.0.107" extension="${sendingAsid}"/>
                    </agentSystemSDS>
                  </AgentSystemSDS>
                </author1>
                <subject typeCode="SUBJ">
                  <PDSResponse classCode="OBS" moodCode="EVN">
                    <pertinentInformation typeCode="PERT">
                      <pertinentSerialChangeNumber classCode="OBS" moodCode="EVN">
                        <code code="2" codeSystem="2.16.840.1.113883.2.1.3.2.4.17.35"/>
                        <value value="2"/>
                      </pertinentSerialChangeNumber>
                    </pertinentInformation>
                    <subject typeCode="SBJ">
                      <patientRole classCode="PAT">
                        <confidentialityCode code="S" codeSystem="2.16.840.1.113883.2.1.3.2.4.16.1"/>
                        <id extension="${nhsNumber}" root="2.16.840.1.113883.2.1.4.1"/>
                        <patientPerson classCode="PSN" determinerCode="INSTANCE">
                          <multipleBirthOrderNumber value="2"/>
                          <playedOtherProviderPatient classCode="PAT">
                            <subjectOf typeCode="SBJ">
                              <patientCareProvision classCode="PCPR" moodCode="EVN">
                                <code code="1" codeSystem="2.16.840.1.113883.2.1.3.2.4.17.37"/>
                                <id root="2.16.840.1.113883.2.1.3.2.4.18.1" extension="NCC1701A"/>
                                <performer typeCode="PRF">
                                  <assignedEntity classCode="ASSIGNED">
                                    <id root="2.16.840.1.113883.2.1.4.2" extension="${gpPracticeNumber}"/>
                                  </assignedEntity>
                                </performer>
                                <pertinentInformation typeCode="PERT">
                                  <pertinentCareProviderPaymentInfo classCode="OBS" moodCode="EVN">
                                    <code code="43" codeSystem="2.16.840.1.113883.2.1.3.2.4.17.35"/>
                                    <effectiveTime value="20030930"/>
                                    <pertinentInformation typeCode="PERT">
                                      <pertinentDispensingAuthorisationReason classCode="OBS" moodCode="EVN">
                                        <code code="42" codeSystem="2.16.840.1.113883.2.1.3.2.4.17.35"/>
                                        <value code="2" codeSystem="2.16.840.1.113883.2.1.3.2.4.17.209"/>
                                      </pertinentDispensingAuthorisationReason>
                                    </pertinentInformation>
                                    <subject typeCode="SBJ">
                                      <residentialInstitution classCode="ASSIGNED">
                                        <id root="1.2.826.0.1285.0.1.10" extension="THX1138"/>
                                      </residentialInstitution>
                                    </subject>
                                  </pertinentCareProviderPaymentInfo>
                                </pertinentInformation>
                              </patientCareProvision>
                            </subjectOf>
                          </playedOtherProviderPatient>
                          <COCT_MT000209UK01.PartAdminGenderCode classCode="PART">
                            <partPerson classCode="PSN" determinerCode="INSTANCE">
                              <administrativeGenderCode code="2"/>
                            </partPerson>
                            <subjectOf typeCode="SBJ">
                              <notificationTime classCode="OBS" moodCode="EVN">
                                <code code="45" codeSystem="2.16.840.1.113883.2.1.3.2.4.17.35"/>
                                <value value="20030930"/>
                              </notificationTime>
                            </subjectOf>
                          </COCT_MT000209UK01.PartAdminGenderCode>
                          <COCT_MT000210UK01.PartBirthTime classCode="PART">
                            <partPerson classCode="PSN" determinerCode="INSTANCE">
                              <birthTime value="19780721"/>
                            </partPerson>
                            <subjectOf typeCode="SBJ">
                              <notificationTime classCode="OBS" moodCode="EVN">
                                <code code="45" codeSystem="2.16.840.1.113883.2.1.3.2.4.17.35"/>
                                <value value="19780721"/>
                              </notificationTime>
                            </subjectOf>
                          </COCT_MT000210UK01.PartBirthTime>
                          <COCT_MT000211UK01.PartDeceasedTime classCode="PART">
                            <partPerson classCode="PSN" determinerCode="INSTANCE">
                              <deceasedTime value="200312020635"/>
                            </partPerson>
                            <subjectOf typeCode="SBJ">
                              <notificationTime classCode="OBS" moodCode="EVN">
                                <code code="45" codeSystem="2.16.840.1.113883.2.1.3.2.4.17.35"/>
                                <value value="20031202"/>
                              </notificationTime>
                            </subjectOf>
                          </COCT_MT000211UK01.PartDeceasedTime>
                          <COCT_MT000202UK03.PartOfWhole classCode="PART">
                            <telecom use="H" value="tel:01132345467"/>
                            <subjectOf1 typeCode="SBJ">
                              <sourceSourceIdentified classCode="OBS" moodCode="EVN">
                                <code code="01" codeSystem="2.16.840.1.113883.2.1.3.2.4.17.170"/>
                                <value root="1.2.826.0.1285.0.1.10" extension="NCC1701D"/>
                              </sourceSourceIdentified>
                            </subjectOf1>
                          </COCT_MT000202UK03.PartOfWhole>
                          <COCT_MT000203UK03.PartOfWhole classCode="PART">
                            <partPerson classCode="PSN" determinerCode="INSTANCE">
                              <name use="L">
                                <prefix>Ms</prefix>
                                <given>Susan</given>
                                <given>Sally</given>
                                <family>Editestpatient</family>
                                <validTime>
                                  <low value="20030930"/>
                                  <high value="20030930"/>
                                </validTime>
                                <id root="2.16.840.1.113883.2.1.3.2.4.18.1" extension="P000000022"/>
                              </name>
                            </partPerson>
                          </COCT_MT000203UK03.PartOfWhole>
                          <COCT_MT000203UK03.PartOfWhole classCode="PART">
                            <partPerson classCode="PSN" determinerCode="INSTANCE">
                              <name use="PREVIOUS">
                                <prefix>Mrs</prefix>
                                <given>Susan</given>
                                <given>Sally</given>
                                <family>Virtualpatient</family>
                                <validTime>
                                  <low value="19960822"/>
                                  <high value="20030930"/>
                                </validTime>
                                <id root="2.16.840.1.113883.2.1.3.2.4.18.1" extension="P000000024"/>
                              </name>
                            </partPerson>
                          </COCT_MT000203UK03.PartOfWhole>
                          <COCT_MT000203UK03.PartOfWhole classCode="PART">
                            <partPerson classCode="PSN" determinerCode="INSTANCE">
                              <name use="PREVIOUS-MAIDEN">
                                <prefix>Ms</prefix>
                                <given>Susan</given>
                                <given>Sally</given>
                                <family>Editest</family>
                                <validTime>
                                  <low value="19880719"/>
                                  <high value="19960822"/>
                                </validTime>
                                <id root="2.16.840.1.113883.2.1.3.2.4.18.1" extension="P000000023"/>
                              </name>
                            </partPerson>
                          </COCT_MT000203UK03.PartOfWhole>
                        </patientPerson>
                        <recordTargetOf typeCode="RCT">
                          <clinicalDocumentEvent classCode="DOCCLIN" moodCode="EVN">
                            <code code="16521000000101" codeSystem="2.16.840.1.113883.2.1.3.2.4.15"/>
                            <location typeCode="LOC">
                              <participantBackOfficeLocationCoded classCode="SDLOC">
                                <code code="NBO" codeSystem="2.16.840.1.113883.2.1.3.2.4.17.226"/>
                              </participantBackOfficeLocationCoded>
                            </location>
                            <subjectOf3 typeCode="SUBJ">
                              <transferStatus classCode="OBS" moodCode="EVN">
                                <code code="19" codeSystem="2.16.840.1.113883.2.1.3.2.4.17.35"/>
                                <priorityCode code="U" codeSystem="2.16.840.1.113883.2.1.3.2.4.17.190"/>
                                <value code="RB" codeSystem="2.16.840.1.113883.2.1.3.2.4.17.167"/>
                                <subjectOf1 typeCode="SUBJ">
                                  <COCT_MT000205UK01.SourceIdentified classCode="OBS" moodCode="EVN">
                                    <code code="01" codeSystem="2.16.840.1.113883.2.1.3.2.4.17.170"/>
                                    <value root="1.2.826.0.1285.0.2.0.107" extension="24334245633"/>
                                  </COCT_MT000205UK01.SourceIdentified>
                                </subjectOf1>
                                <subjectOf2 typeCode="SUBJ">
                                  <systemEffectiveDate classCode="OBS" moodCode="EVN">
                                    <code code="02" codeSystem="2.16.840.1.113883.2.1.3.2.4.17.170"/>
                                    <value>
                                      <center value="200201211705"/>
                                    </value>
                                  </systemEffectiveDate>
                                </subjectOf2>
                              </transferStatus>
                            </subjectOf3>
                          </clinicalDocumentEvent>
                        </recordTargetOf>
                        <replacementOf typeCode="REPL">
                          <oldVersion classCode="PAT">
                            <effectiveTime>
                              <high value="200406251220"/>
                            </effectiveTime>
                            <id root="2.16.840.1.113883.2.1.3.2.4.3" extension="BRS123456"/>
                          </oldVersion>
                        </replacementOf>
                        <subjectOf11 typeCode="SBJ">
                          <treatmentEntitlement classCode="OBS" moodCode="EVN">
                            <code code="21" codeSystem="2.16.840.1.113883.2.1.3.2.4.17.35"/>
                            <value code="1" codeSystem="2.16.840.1.113883.2.1.3.2.4.17.210"/>
                            <component typeCode="COMP">
                              <treatmentCategoryType classCode="OBS" moodCode="EVN">
                                <code code="24" codeSystem="2.16.840.1.113883.2.1.3.2.4.17.35"/>
                                <value code="2" codeSystem="2.16.840.1.113883.2.1.3.2.4.17.208"/>
                              </treatmentCategoryType>
                            </component>
                          </treatmentEntitlement>
                        </subjectOf11>
                        <subjectOf2 typeCode="SBJ">
                          <deathNotification classCode="OBS" moodCode="EVN">
                            <code code="3" codeSystem="2.16.840.1.113883.2.1.3.2.4.17.35"/>
                            <value code="2" codeSystem="2.16.840.1.113883.2.1.3.2.4.16.5"/>
                          </deathNotification>
                        </subjectOf2>
                        <subjectOf3 typeCode="SBJ">
                          <consent classCode="OBS" moodCode="EVN">
                            <code code="4" codeSystem="2.16.840.1.113883.2.1.3.2.4.17.164"/>
                            <value code="1" codeSystem="2.16.840.1.113883.2.1.3.2.4.16.2"/>
                          </consent>
                        </subjectOf3>
                        <subjectOf7 typeCode="SBJ">
                          <nHAISRegistrationEvent classCode="REG" moodCode="EVN">
                            <code code="01" codeSystem="2.16.840.1.113883.2.1.3.2.4.17.165"/>
                            <custodian typeCode="CST">
                              <assignedDevice classCode="ASSIGNED">
                                <id root="2.16.840.1.113883.2.1.3.2.4.6" extension="123456"/>
                              </assignedDevice>
                            </custodian>
                          </nHAISRegistrationEvent>
                        </subjectOf7>
                        <subjectOf9 typeCode="SBJ">
                          <pCRemovalRegistrationEvent classCode="REG" moodCode="EVN">
                            <code code="04" codeSystem="2.16.840.1.113883.2.1.3.2.4.17.165"/>
                            <effectiveTime>
                              <center value="20031202"/>
                            </effectiveTime>
                            <reasonCode code="DEA" codeSystem="2.16.840.1.113883.2.1.3.2.4.17.168"/>
                          </pCRemovalRegistrationEvent>
                        </subjectOf9>
                      </patientRole>
                    </subject>
                  </PDSResponse>
                </subject>
                <queryAck type="QueryAck">
                  <queryResponseCode code="OK"/>
                </queryAck>
              </ControlActEvent>
            </QUPA_IN050000UK32>
        </retrievalQueryResponse>
    </SOAP-ENV:Body>
</SOAP-ENV:Envelope>`;
