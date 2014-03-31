var approval = mc.getPayloadXML()..*::approval.toString();                    mc.setPayloadJSON(                        {                            "approval" : approval                        });
